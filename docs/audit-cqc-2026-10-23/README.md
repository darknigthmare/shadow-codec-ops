# Audit complet CQC — P41, 23 octobre 2026

**Objet : établir ce qui existe, ce qui manque, ce qui reste partiel et les travaux nécessaires pour viser une fidélité 1:1 vérifiable.** L’audit couvre les personnages principaux, secondaires et tertiaires, les incarnations et PNJ, les costumes officiels et originaux, les stages, les Metal Gear et gros boss, les sprites et animations, les Chroniques, l’audio et les systèmes de jeu.

**Version de référence :** [`ba4e30a09e9e95727b75a665e7b6ab07d9941aea`](https://github.com/darknigthmare/shadow-codec-ops/commit/ba4e30a09e9e95727b75a665e7b6ab07d9941aea), branche `codex/cqc-p40-batch30-recovery`, dernière tête P41 vérifiée dans la [PR source #3](https://github.com/darknigthmare/shadow-codec-ops/pull/3). La branche `main` ne représente pas cette version. La PR d’audit est donc basée sur cette branche P41 ; son diff ne contient que ce dossier documentaire. L’état de déploiement public n’est pas utilisé comme preuve.

## Lire l’audit

| Besoin | Document ou fichier |
|---|---|
| Parcourir, trier et filtrer tout l’inventaire | [CQC_AUDIT_COMPLET_2026-10-23.xlsx](outputs/CQC_AUDIT_COMPLET_2026-10-23.xlsx) — 21 onglets |
| Comprendre les chiffres et le niveau de preuve | [01 — Méthode et inventaire](01_METHODE_ET_INVENTAIRE.md) |
| Personnages, rôles, costumes officiels et concepts originaux | [02 — Roster et costumes](02_ROSTER_COSTUMES.md) |
| Stages, Metal Gear, véhicules et boss | [03 — Stages et machines](03_STAGES_MACHINES.md) |
| Chaque décor déjà enregistré | [03A — 124 fiches de stages existants](03A_STAGES_EXISTANTS.md) |
| Lieux et éditions à compléter | [03B — 113 lots de stages](03B_STAGES_COMPLEMENTS.md) |
| Anatomie, attaques et phases des grandes rencontres | [03C — 33 fiches de boss et animations](03C_BOSS_ANIMATIONS.md) |
| Contrat détaillé des poses, transitions, techniques et finishers | [04 — Animations et sprites](04_ANIMATIONS_SPRITES.md) |
| Trouver la fiche de chacun des 380 profils | [Index des animations par personnage](animations/README.md) — 43 chapitres |
| Personnage original optionnel, hors roster par défaut | [Parallaxe](animations/oc-parallaxe.md) |
| Histoires, illustrations, audio, commandes, sauvegarde et performance | [05 — Narration, audio et systèmes](05_NARRATION_AUDIO_SYSTEMES.md) |
| Décider des prochains lots | [06 — Priorités et réception](06_PRIORITES_ET_LOTS.md) — 42 lots |
| Vérifications effectuées et limites pratiques | [Vérifications](VERIFICATIONS.md) |

Le classeur contient **14 529 lignes de consultation** réparties par type d’objet. Ce total mélange volontairement des profils, techniques, variantes, scènes, références et lots : **il ne mesure pas un nombre d’éléments manquants**. Les fiches Markdown et les données JSON/CSV conservent les détails volumineux, notamment les pièces, pivots et articulations de machines.

## Résultat de l’inventaire

Les grandes distributions et de nombreux décors sont déjà présents. Le chantier principal est leur **achèvement précis** : gestes et transitions distincts, costumes et éditions correctement identifiés, arènes exactes des rencontres, phases des machines, histoires récentes, illustrations et audio. La dernière version ne doit pas être évaluée à partir de listes `pending-art` ou de compteurs d’anciennes passes.

| Mesure sur P41 | Résultat | Interprétation correcte |
|---|---:|---|
| Profils de combat actifs | **380** | Incarnations, alias, équipements, animaux, objets et machines compris ; pas 380 personnes uniques. |
| Routes vers des corps sprite standard | **356** | Les 24 autres profils ont une route machine identifiée. Aucun profil n’est déclaré sans route visuelle à partir de cette mesure. |
| Techniques enregistrées | **3 800** | Dix fiches par profil, avec paramètres et contre-jeu ; pas 3 800 séquences de dessins indépendantes. |
| Finishers enregistrés | **1 520** | Quatre fiches par profil ; pas une preuve de 1 520 chorégraphies originales. |
| Alternatives de costumes effectives | **217** | Union dédupliquée `(UID, costume)` ; hors tenue Original. |
| Couples acteur / tenue à contrôler | **597** | 380 originaux + 217 alternatives. |
| Stages du registre partagé | **124** | Définitions et couches admises ; Port Area est un module dédié supplémentaire. |
| Définitions de rigs partagés | **64** | Directions, variantes et visualisations comprises ; pas 64 boss uniques. |
| Dossiers Arsenal | **33** | Rencontres ou simulations propres à CQC. |
| Histoires des Chroniques | **354** | **26 profils actifs** n’ont pas encore d’histoire. |
| Scènes narratives existantes | **2 124** | Trois scènes d’introduction et trois d’épilogue par histoire. |
| Illustrations complètes déclarées | **486** | 81 histoires × 6 scènes ; déclaration du mapping, sans nouvelle inspection individuelle des images. |
| Scènes encore en composition | **1 638** | 273 histoires × 6 scènes à illustrer si l’objectif est une peinture complète par scène. |
| Fichiers du manifeste runtime | **2 736** | Tous les chemins déclarés retrouvés dans l’arbre Git audité. |
| Volume cumulé déclaré | **3 187 473 639 octets** | Environ 3,19 Go ; ce n’est ni le téléchargement initial ni une mesure de fluidité. |

Sources de mesure : [état et empreintes](data/etat_mesure.json), [reçu de capture](data/capture_receipt.json), [résumé des animations](data/animation_summary.json), [catalogue des costumes](02_costumes_presents.csv), [inventaire des stages](03_stages_existants.csv) et [couverture narrative](data/narration_profils.csv).

## Les écarts les plus utiles à traiter

### 1. Finir les six attentes explicites P41

Les notes de la version maintiennent en attente **Campbell MGS1 Rétro**, les corps de **Hideo Peace Walker**, **Hideo Ground Zeroes** et **Hideo The Phantom Pain**, ainsi que **TT77 Nosorog** et **UTH-66 Blackfoot**. Les trois portraits Hideo sont déjà livrés. Ils ne constituent pas les trois corps de combat. Les costumes Raiden, les 24 ajouts P41 et les productions P40 sont conservés comme présents. [Notes P41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/docs/cqc-reprise/pass41/batch30-20261023/RELEASE_NOTES_FR_20261023.md).

### 2. Réconcilier les compteurs avant de planifier la production

La politique de garde-robe porte sur **375 UID**, contre **380 profils actifs**. Fenrir, Raptor, Hammerhead, Rescue Box et Raiden R-00 sont hors de ce périmètre. Dans la politique actuelle, **291 besoins Rétro** et **287 besoins Gala** restent non couverts. Les **375 nextgen couverts** reposent principalement sur le style original : ils ne désignent pas 375 nouveaux costumes. Le catalogue effectif compte 217 alternatives, contre 191 entrées dans le seul index différé. [Détail des périmètres](02_ROSTER_COSTUMES.md).

Le compteur de tonalités de finishers est également périmé : `toneCounts.stylized` vaut **220**, alors que le rapprochement des profils en trouve **246** ; `simulation=122` et `nonlethal=12` restent cohérents. L’agrégat reste donc à 354 au lieu de 380. Le problème est un compteur, pas l’absence des 104 fiches de finishers des 26 profils ajoutés. [Preuve et validation](data/animation_validation.json).

### 3. Produire des mouvements complets, propres à chaque corps

Le chapitre 04 spécifie les poses et transitions : neutre, marche avant/arrière, départ, freinage, changement de direction, course/dash si applicable, accroupissement, garde haute/basse, saut et réception, impact, chute, relevé, prises, armes, rechargements, intro de duel, victoire/défaite de manche et sortie finale. Le renderer utilise des groupes partagés ; l’absence d’un groupe dédié doit être examinée avec le mouvement réellement rendu, sans conclure automatiquement à une absence de dessin.

Pour chaque profil, les fiches relient **neuf groupes d’états**, les **dix techniques actuellement enregistrées** et **quatre finishers**. Chaque technique contient l’anticipation, l’action, le retour, les ticks CQC, le groupe d’images résolu, les régions disponibles dans les deux directions et le critère de réception. Chaque finisher a un storyboard en cinq plans. Les 597 couples acteur/tenue ont leur contrôle d’accessoires et d’asymétrie. Les déplacements d’un enfant, d’un quadrupède, d’un hélicoptère et d’un humanoïde ne sont pas interchangeablement décrits comme un corps humain. [Fiches individuelles](animations/README.md) · [Techniques](data/animation_moves.csv) · [Finishers](data/animation_finishers.csv).

Ces descriptions constituent un **cahier de production CQC**. Les timings d’équilibrage existants ne sont pas présentés comme des mesures identiques aux animations des jeux Konami. Une posture uniquement documentée de face ne permet pas d’inventer sa face arrière puis de la déclarer certifiée.

### 4. Distinguer le boss présent de son affrontement fidèle

| Cas | État P41 et travail restant |
|---|---|
| **Null — Portable Ops** | Affectation au décor de prison ; distinguer ses rencontres à l’entrée du silo et à la sous-station. |
| **Hind D / M1 — MGS1** | Rigs présents, héliport réutilisé comme simulation ; compléter tour de communications et canyon pour les rencontres de référence. |
| **RAY — Revengeance** | Le pont de scène utilise la cour d’Abkhazie R-01 ; le prologue R-00 demande son contexte africain et ses séquences de route/train. |
| **TX-55 — MSX** | Règles CQC de tirs aux jambes puis au contrôle ; la rencontre d’origine requiert un contrat distinct d’explosifs et de caméras. |
| **GANDER — Ghost Babel** | Le code admet une adaptation à deux phases ; les trois phases de la source restent à reconstituer. |
| **Peace Walker bipède** | Modèle présent, avec plusieurs armes, événements et vues explicitement non admis dans ses qualifications actuelles. |
| **M1 / Bulldozer** | Chenilles rigides déclarées ; compléter déplacement de la bande et des roues selon vitesse et orientation. |

Les preuves code, les sources et les limites de chaque constat figurent dans [03 — Priorités et écarts concrets](03_STAGES_MACHINES.md) et les [33 fiches de rencontres](03C_BOSS_ANIMATIONS.md). **RAY MGS4 et Port Area existent dans des modules privés** ; ils ne sont pas classés absents parce qu’ils échappent aux registres partagés. Les coordonnées, HP, durées et collisions du moteur sont identifiés comme paramètres CQC.

### 5. Compléter les histoires et leurs images

Les **26 profils sans histoire** comprennent les ajouts Survive, plusieurs Gekko, les boîtes de Peace Walker, des UG de Rising et Raiden R-00. Le chapitre 05 donne la liste complète et une proposition de trois scènes d’introduction plus trois scènes d’épilogue pour chacun, soit **156 scènes nouvelles**. Les objets et équipements gardent une narration adaptée à leur nature ; un carton n’est pas transformé gratuitement en personne autonome. [26 propositions détaillées](05_NARRATION_AUDIO_SYSTEMES.md).

Les 1 638 scènes existantes en composition sont listées individuellement avec titre, lieu, caméra, accessoire et clé d’image. **Aucune histoire ne partage actuellement une même clé d’image entre son introduction et son épilogue.** Cela établit la distinction du mapping, pas l’unicité visuelle absolue de tous les PNG. [2 124 scènes](data/narration_scenes.csv).

### 6. Séparer absence de fichier audio et absence de son

Le manifeste ne déclare pas de fichiers audio, mais le code utilise déjà de la synthèse sonore. Le chantier proposé concerne une bibliothèque détaillée : voix et réactions, armes et rechargements, impacts selon matériau, moteurs et servos, ambiances de stage, musique et signaux d’interface. Chaque son doit avoir ses déclencheurs, variantes, boucle, niveau et conditions de lecture. [Cahier audio](05_NARRATION_AUDIO_SYSTEMES.md).

### 7. Étendre la couverture officielle sans fabriquer des doublons

Les catalogues ajoutent **87 tâches de roster**, **315 lignes de référence costumes**, **113 lots de stages** et **54 lots de machines**. Ces ensembles mélangent absence confirmée dans un registre, variante non isolée, ensemble à inventorier, contenu partiel et référence à confirmer. Ils ne sont pas additionnables en un total unique de « choses absentes ».

En particulier, **275 lignes de costumes portent le statut `non_repertorie_comme_option_distincte`**. Il faut les rapprocher de la tenue Original et des images avant de conclure à une absence graphique. Les 40 autres lignes comprennent des variantes présentes, des corps d’origine ou une couverture partielle. Les priorités de ces catalogues s’appliquent **au sein du domaine** ; l’ordre global de production se trouve dans le chapitre 06.

Les incarnations, alias et éditions restent séparés : Snake/Pliskin, EVA/Tatyana, Chris/Goodluck, Weasel/Lensenbrink, Raiden R-00, MGS3 original/3DS/Delta, Online et Arcade. Lucy et Lucinda conservent deux fiches liées, sans assimilation à un simple alias. Carter reste un design historique CQC. **Turtle Armor reste une référence à résoudre** ; il n’est pas arbitrairement renommé Battle Dress ou Power Armor. [Personnages et distinctions](02_ROSTER_COSTUMES.md).

Les sources contemporaines incluent **FOX HUNT** et **Master Collection Vol.2**. Cette dernière est officiellement sortie le 27 août 2026 et comprend MGS4, Peace Walker HD et Ghost Babel ; les bonus **Gold Camouflage MGS4** et **Uniform: GOLD PW** sont documentés séparément. Un portage n’ajoute pas automatiquement de nouveaux lieux. Les costumes Animals, Banana, Fly et Mummy, issus d’un concours intégré officiellement, ne sont pas reclassés comme créations CQC. [Konami MC2](https://www.konami.com/games/eu/en/topics/19257/) · [Nintendo, bonus MC2](https://www.nintendo.com/au/news-and-articles/the-classic-stealth-action-series-returns-with-metal-gear-solid-master-collection-vol-2/) · [Konami, FOX HUNT](https://www.konami.com/games/us/en/topics/3015/) · [Konami, camouflages MGS3](https://www.konami.com/mg/archive/mgs3/english/camouflage_main.html).

### 8. Poursuivre les créations déjà commencées

Les 20 propositions originales reprennent les familles du projet, avec des fiches de silhouette, matières, accessoires et modifications de mouvement. Exemples : **Veille arctique** pour Sniper Wolf, **Atelier mobile** pour Otacon MGS1, **Gala de commandement** pour The Boss, **Conductrice blindée** pour Fortune, **Ruche mécanisée** pour The Pain ou **Reconnaissance Dité** pour Blade Wolf. Le dossier distingue les concepts achevés sur le papier d’une simple piste non résolue comme Turtle Armor. [Concepts et critères](02_costumes_originaux_proposes.csv).

Une création CQC peut viser la fidélité stricte à sa fiche concept et préserver le visage/l’incarnation officielle. Elle ne peut pas être déclarée identique à un costume officiel inexistant. Les apparitions dans des jeux extérieurs comme Smash, Fortnite et Bomberman restent optionnelles ; les collaborations réellement intégrées à un jeu Metal Gear demeurent dans le catalogue de cet opus.

## Données réutilisables

| Domaine | Tables de référence |
|---|---|
| Personnages | [380 présents](02_roster_present.csv) · [87 tâches](02_roster_lacunes.csv) · [source structurée complète](02_roster_costumes.json) |
| Costumes | [217 alternatives](02_costumes_presents.csv) · [315 références](02_costumes_cibles.csv) · [20 concepts](02_costumes_originaux_proposes.csv) · [politique de 375 UID](data/politique_costumes_375.json) |
| Stages | [124 existants](03_stages_existants.csv) · [113 lots](03_stages_a_completer.csv) |
| Machines | [64 rigs et leurs pièces](03_rigs_existants.json) · [33 rencontres](03_boss_fiches.csv) · [54 lots](03_machines_a_completer.csv) · [5 modules spécialisés](03_modules_separes.csv) |
| Animation | [380 profils](data/animation_fighters.json) · [3 800 techniques](data/animation_moves.csv) · [1 520 finishers](data/animation_finishers.csv) · [597 variantes](data/animation_variants.csv) |
| Narration | [380 profils rapprochés](data/narration_profils.csv) · [2 124 scènes](data/narration_scenes.csv) |
| Planification | [42 lots CSV](data/priorites.csv) · [JSON](data/priorites.json) |
| Sources | [Personnages et costumes](02_sources_roster_costumes.json) · [Stages et machines](03_sources.json) |

Les CSV sont en UTF-8 avec BOM pour leur ouverture dans Excel. Les colonnes structurées complexes conservent du JSON ; le classeur en présente une lecture adaptée. Les URL de preuve du code sont épinglées sur le commit audité. Les sources artistiques héritées gardent leur provenance et leurs limites.

## Ce qui est effectivement vérifié

Une capture locale charge les scripts réels dans leur ordre HTML. Les images sont remplacées par un pixel et les accès externes bloqués, afin de lire les registres sans télécharger l’ensemble des ressources graphiques. Elle ne produit aucune exception JavaScript de page. Les rapprochements vérifient les UID, cardinalités, techniques, finishers, variantes, scènes, liens du dossier et chemins de code. Le classeur possède des filtres, des identités figées et une synthèse calculée à partir des tables.

**La fidélité 1:1 est ici un contrat de réception détaillé, pas une certification artistique du jeu.** Ni les 2 736 ressources complètes, ni chaque PNG, ni chaque combat, ni les appareils réels n’ont été inspectés visuellement par cet audit. Les écarts connus, références manquantes, adaptations et vérifications à mener sont indiqués pour permettre cette réception. Les labels hérités `approved`, `accepted_closest` ou `verified` sont rapportés comme métadonnées, sans les transformer en validation nouvelle.

Les commandes de reproduction et les résultats finaux sont dans [VERIFICATIONS.md](VERIFICATIONS.md). Le travail de cette PR consiste en documentation, données et outils de reproduction de l’audit ; il ne livre pas les nouveaux sprites ou mécanismes décrits.
