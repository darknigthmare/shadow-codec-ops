# Shadow Codec Ops - v3.4.0

## Retractable command drawers and first character portrait pack

Version 3.4 replaces the permanent left navigation and Codec utility column with overlay drawers that stay closed while a module is in use. Both drawers support backdrop dismissal, keyboard dismissal and compact mobile safe-area placement.

The first character-specific MGS1 portrait pack adds Solid Snake and Roy Campbell with six automatically selected emotional states: neutral, serious, warning, calm, humor and glitch. The generated portraits contain no text or UI decoration and remain overrideable by local Voice Packs.

See `CODEC_DRAWERS_AND_AVATARS_REPORT.md`.

## Complete MGS3 Survival Radio

Version 3.3 completes the MGS3 radio structure: six operational channels, Virtuous Mission/Snake Eater/Groznyj Grad calls, character dossiers, survival field files, equipment, food, wildlife, timeline, identity states and bilingual lore-grounded conversations.

See `MGS3_COMPLETE_CODEC_REPORT.md`.

## MGS1-D and complete MGS2 Codec layer

Version 3.2 closes the MGS1 reference implementation with an executable final audit and brings MGS2 to the same structured standard. The Tanker, Plant, bomb-disposal, Shell 1 and Arsenal contexts now expose seven complete personnel/system dossiers, contextual incoming calls, identity transitions, zones, equipment, timeline events, portrait states and 43 bilingual lore-grounded conversations.

See `MGS1_CODEC_PASS_D_REPORT.md` and `MGS2_COMPLETE_CODEC_REPORT.md`.

## Previous release - v3.0.0

## MGS1 Codec Pass B — Complete

Version 3.0 expands the Shadow Moses Codec library to 137 bilingual, original lore-grounded conversations. It adds twenty rotating Mei Ling proverbs, detailed Nastasha weapon files, boss intelligence for every major encounter, medical and technical support variants, field reports, Deepthroat warnings, and one persistent automatic incoming call for each of the ten MGS1 chapter contexts.

The scheduled calls are queued through the same ACCEPT / IGNORE / MISSED CALL system as the rest of the Codec and are stored locally so one-shot chapter calls do not repeat.

## MGS1 Codec Pass A — Personnel Architecture

The MGS1 Codec now includes eight structured personnel files, ten Shadow Moses contexts, sixty MGS1 conversations, chapter-aware topics, discovery progress and identity transitions for Miller/Liquid and Deepthroat/Gray Fox. See `MGS1_CODEC_PASS_A_REPORT.md`.

# Shadow Codec Ops

Base de projet privée pour un **simulateur Codec tactique** avec une campagne interconnectée, un module **Side Ops 2D** old-school, un deck **Tape Archive / iDroid**, des **VR Missions** et des outils de création locaux.

## Passe Codec 4 — Radio Scan & Signal Intelligence

- spectre radio interactif avec vue globale par époque ou zoom local ;
- balayage manuel, recherche du pic précédent/suivant et auto-sweep ;
- 24 signaux contextuels : interceptions, contacts secrets, numbers stations, paquets chiffrés, anomalies et leurres ;
- signaux intermittents et porteuses à dérive temporelle ;
- verrouillage fondé sur la puissance réelle du signal et la distance à la fréquence centrale ;
- quatre familles de puzzles : codeword, séquence de fréquences, checksum et clé de contexte ;
- journal persistant des découvertes, déchiffrements, tentatives, notes et points Intel ;
- déblocage automatique de contacts/conversations après interception ou décodage ;
- export JSON du dossier Signal Intelligence ;
- séparation stricte entre fréquences canoniques documentées et transmissions de simulation lore-compatible.

## Passe Codec 3 — Canon Data Expansion

- 55 contacts répartis par jeu, chapitre et contexte ;
- 32 contextes de mission et 55 règles de disponibilité ;
- 102 conversations bilingues originales et lore-compatible ;
- registre de sources distinguant manuels officiels, références en jeu et design de simulation ;
- variantes de fréquence par contexte et sujet, dont les canaux de sauvegarde ;
- contacts Peace Walker/MSF, MGS4 et MGSV enrichis sans présenter les routes modernes comme fréquences officielles ;
- dossier canon visible par contact avec jeu, année, rôle, alias, canaux et sources ;
- matrice de couverture par époque avec lacunes restantes ;
- tests d'intégrité entre contacts, contextes, règles, conversations, sources et couverture.

## Passe Codec 2 — Visual Identity

- neuf profils visuels data-driven, un par époque Codec ;
- sept compositions réellement distinctes pour MSX, MGS1, MGS2, MGS3, MGS4, Peace Walker et MGSV ;
- terminal texte MSX, twin Codec MGS1, HUD numérique MGS2 et radio analogique MGS3 ;
- appel vidéo cinématique MGS4, dossier MSF Peace Walker et iDroid holographique MGSV ;
- présentations VR et Patriots conservées comme layouts spécialisés ;
- libellés CALL/MEMORY/HISTORY/DATA propres à chaque époque ;
- animations d'appel entrant et panneaux mémoire/sauvegarde adaptés à l'appareil ;
- pack Peace Walker/MSF dédié, indépendant du thème MGSV ;
- responsive mobile et respect de la réduction des mouvements.

## Passe Codec 1 — Core Fidelity

- contextes de jeu, chapitre, mission et personnage jouable ;
- disponibilité réelle des contacts selon le contexte et la mémoire ;
- résolution explicite des fréquences partagées ;
- menu de sujets par contact et rotation des conversations déjà entendues ;
- appels entrants avec priorité, file d'attente, acceptation, refus et appels manqués ;
- historique enrichi avec rappel préparé ;
- trois slots de sauvegarde Codec locale ;
- authoring des sujets et restrictions de contexte dans Conversation Studio.

## Version actuelle

`2.6.0` — **Passe Codec 4 : Radio Scan & Signal Intelligence**.

## Contenu actuel

- React + Vite + TypeScript
- Structure prête pour Tauri Desktop
- PWA installable et utilisable hors ligne après le premier chargement
- HUD tactile rétractable partagé par Side Ops et VR
- Codec Core Fidelity : contextes de mission, profils joueur, fréquences partagées, routage, sujets, CALL entrants, MEMORY, appels manqués et sauvegardes
- **Codec Director Mode** : timeline à embranchements, choix, interruptions, événements, variables, camera cues et séquences cross-module
- **Packs visuels sélectionnables** :
  - MSX Military Radio
  - Classic MGS1 Codec
  - MGS2 Digital Codec
  - MGS3 Survival Radio
  - MGS4 Modern Codec
  - Peace Walker MSF Briefing Files
  - MGSV iDroid / Cassette Deck
  - VR Training Grid
  - Patriots AI Corruption
- Galerie de thèmes dans Settings avec description, layout, humeur et effets
- Sélecteur d’époque + sélecteur de skin directement dans l’écran Codec
- Panneau **Visual Pack Status** avec description de l’era, contacts connus, contacts mémoire et effets actifs
- Base canonique étendue : 55 contacts, 32 contextes, 55 règles de disponibilité, 102 conversations et 13 sources enregistrées
- **Signal Intelligence** : spectre interactif, auto-sweep, pics de porteuse, interceptions, chiffrement, dérive de fréquence et journal Intel persistant
- Signal meter visuel + gestion signal stable/faible/corrompu
- Labels speakers améliorés pour contacts multi-époques
- **Tape Archive / iDroid Deck** complet : bibliothèque, cassettes, waveform CSS, lecture simulée, transcriptions, favoris, notes et progression locale
- Catégories Tape Archive : Mission, Intel, Character, Mother Base, Weapon, Anomaly
- Import/export JSON des tapes custom et export de la progression/favoris
- **VR Missions** : sélection de défis courts, Time Attack, No Alert, Weapon Training, CQC, Surveillance, Boss Challenge
- **Lore Database** : personnages, organisations, lieux, fréquences, missions, items, ennemis, boss, tapes, VR et systèmes
- Recherche Lore globale + filtres par catégorie, ère et couche canon/simulation/gameplay/custom
- Entrées Lore auto-générées depuis contacts, fréquences, missions, items, ennemis, boss, tapes et VR Missions
- Entrées manuelles `loreEntries.json` pour les gros concepts/personnages/organisations
- Liens rapides depuis la Lore Database vers Codec, Side Ops, Tapes, VR et Settings
- Favoris, historique, notes locales et import/export JSON de lore custom
- Training board VR avec timer, stats, évaluation, rank, accuracy, failures et records locaux
- Déblocage local de tapes et badges VR selon le rank obtenu
- Tape Archive compatible avec les rewards VR : les cassettes conditionnelles restent verrouillées tant que la mission VR associée n’est pas validée
- Side Ops 2D Phaser jouable : joueur, plateformes, gardes, caméra, projecteur, keycard, porte, boss, secrets, extraction
- **Campaign Ops** : campagne connectée Codec → Side Ops → Tapes → VR → Lore
- **Campaign Builder** : graphe visuel, conditions AND/OR, branches exclusives, fins alternatives, playtest et packs JSON
- **Campaign Presentation** : briefings/débriefings plein écran, scènes multi-beat, événements narratifs, variables persistantes, choix de branche cinématiques et galerie des fins
- campagne intégrée **Legacy Signal**, de Shadow Moses au Tanker, avec chapitre final à doctrine exclusive
- graphe de progression avec prérequis, ranks minimums, nœuds optionnels, conditions multiples AND/OR et récompenses automatiques
- trois slots de campagne séparés avec New Game/Continue, export/import JSON, embranchements persistants et New Game+
- ressources persistantes : Command Points, Intel, Supplies et Credits
- niveau opérateur, XP, badges et journal des opérations
- déblocages interconnectés de missions, VR, tapes, contacts et dossiers Lore
- synchronisation explicite des anciennes performances Codec/Side Ops/VR/Tape/Lore
- améliorations permanentes de départ : munitions SOCOM, ration et chaff supplémentaires
- **Mission Select Side Ops** avec missions intégrées + missions custom publiées depuis le Builder
- **Mission Builder** : placement visuel, objectifs, triggers Codec, validation, playtest et import/export de packs JSON
- **Mission 002 — Tanker Hold Sabotage** : nouvel environnement MGS2 simulation, rain deck, bulkhead keycard, search zone, Shielded Deck Commander
- Gameplay core Side Ops : SOCOM, munitions, vie, dégâts, ration, chaff, CQC non létal, tirs ennemis
- Alert System complet : NORMAL / SUSPICION / ALERT / EVASION / CAUTION / MISSION FAILED
- Suspicion progressive avec source de détection : garde, caméra, projecteur, bruit, tir, CQC visible
- Renforts dynamiques si l’alerte dure trop longtemps
- Score furtivité temps réel + suspicion meter + timeline d’alerte
- Codec intégré côté Side Ops avec mini-transcript ligne par ligne
- HUD React + HUD Phaser synchronisés via EventTarget
- Mission 001 complète : objectifs intermédiaires, searchlight yard, Armored Guard Captain, boss phases, secrets, extraction verrouillée
- Mission failed/retry avec écran résultat dédié
- Conversation Studio : création, duplication, édition, prévisualisation Codec, import/export JSON et conversion directe vers Director
- Trigger overrides locaux : une conversation custom peut remplacer un appel Codec Side Ops selon mission + trigger
- Conversations custom visibles dans le Codec Simulator et les appels Side Ops
- Meilleur score local sauvegardé séparément pour chaque mission Side Ops
- Rank final détaillé : stealth score, objectifs, secrets, boss, alertes, renforts, kills, neutralisations, tirs, dégâts, rations, caméras
- Données JSON locales : eras, contacts, conversations, missions, items, ennemis, boss, thèmes, tapes, vrMissions, loreEntries, campaigns
- **VR Phaser Bridge** : les VR Missions peuvent maintenant lancer une vraie scène Phaser jouable, puis renvoyer les stats au système de rank/rewards
- Build web vérifié avec `npm run build`
- Chargement paresseux de tous les gros modules React : Campaign Ops, Campaign Builder, Codec, Codec Director, Side Ops, VR, Tapes, Studio, Mission Builder, Lore et Settings
- Phaser isolé dans un chunk dédié et chargé uniquement au lancement d’une scène jouable
- Scènes Phaser Side Ops et VR importées séparément selon le mode demandé
- Écran de démarrage global et écran de streaming par module
- Error Boundary global + Error Boundary par route avec rapport d’incident local
- Migration automatique des anciennes clés de sauvegarde et diagnostic de schéma
- Bundle initial maintenu à environ 28,4 kB de code applicatif malgré la couche narrative, hors React et modules différés
- **Remapping clavier local** avec détection des conflits et échange automatique des touches
- **Support manette standard** dans Side Ops, VR Training et les écrans de résultat
- Vibration manette optionnelle pour tirs, dégâts, soins et chaff
- Options d’accessibilité : mouvements réduits, flashs réduits, contraste renforcé, texte agrandi et annonces lecteur d’écran
- Navigation clavier renforcée avec skip link, focus visible et focus automatique sur le module actif
- Panneau Runtime Diagnostics avec export JSON
- Tests Vitest pour contrôles, migrations, ranks et intégrité des données JSON
- Commande de validation complète `npm run qa`


## Campaign Presentation & Narrative Events

La Passe 20 transforme la progression Campaign Ops en couche narrative complète :

- briefing et débriefing globaux de campagne ;
- briefing et débriefing de chaque chapitre ;
- scènes de fin d’opération et épilogues ;
- présentations multi-beat avec speaker, ton et niveaux d’emphase ;
- cartes plein écran pour les choix de doctrine ;
- événements déclenchés par début/fin de campagne, chapitre, nœud, branche, fin ou condition de variable ;
- variables persistantes `string / number / boolean` ;
- mutations `set / increment / decrement / toggle` ;
- conditions `variable_compare` utilisables par les opérations et les événements ;
- historique narratif rejouable ;
- galerie des fins découvertes ;
- statistiques agrégées Side Ops, VR, Codec, Tapes et Lore ;
- création de ces éléments directement dans Campaign Builder ;
- migration automatique des slots v1.8 vers Campaign Progress schema 3.

Les mutations d’un nœud sont appliquées au moment où sa récompense est validée. L’écran narratif affiche ensuite la conséquence sans la réappliquer, ce qui évite les doubles effets.

## Installation

```bash
npm install
npm run dev
```

## Build web et QA

```bash
npm run lint
npm run test
npm run build
npm run preview
```

Pour exécuter toute la validation en une commande :

```bash
npm run qa
```

## Desktop Tauri

Installer les prérequis Tauri/Rust, puis :

```bash
npm run tauri:dev
npm run tauri:build
```

## Contrôles Side Ops et VR

Les touches clavier sont désormais configurables dans **Settings → Controls & Gamepad**. Le profil par défaut reste :

- Flèches / A-D : déplacement
- W / flèche haut : saut
- S / flèche bas : accroupi
- Shift : marche tactique
- J : tir SOCOM
- Espace : CQC
- F : chaff
- R : ration
- C : Codec
- Entrée : confirmer / évaluer
- Échap : annuler / abandonner

Preset manette standard :

- stick gauche ou D-pad : déplacement
- A / Cross : saut
- X / Square : tir
- B / Circle : CQC
- Y / Triangle : chaff
- LB / L1 : ration
- RB / R1 : Codec
- LT / L2 : marche tactique
- Start / Options : confirmer
- Back / Share : annuler

Les remappings sont sauvegardés localement et lus directement par les scènes Phaser au prochain lancement de mission.


## Campaign Ops & Progression Layer

Le module **CAMPAIGN OPS** relie les systèmes qui restaient auparavant indépendants :

- appel de briefing via le Codec ;
- lancement de la mission Side Ops ciblée ;
- validation d’un rank minimum ;
- écoute d’une cassette débloquée ;
- défi VR ;
- consultation d’un dossier Lore ;
- déblocage du chapitre suivant.

La campagne intégrée **Legacy Signal** contient désormais trois chapitres :

1. **Shadow Moses Signal** : briefing Campbell, Dock Infiltration, archive, VR Dock Sprint et dossier Shadow Moses ;
2. **Tanker Intercept** : liaison Otacon, Tanker Hold Sabotage, Ghost Dock, archive Tanker et milestone final ;
3. **Final Doctrine** : choix exclusif Ghost/Direct Action, route opposée bloquée et deux fins alternatives.

La progression comprend :

- XP et niveau opérateur ;
- Command Points, Intel, Supplies et Credits ;
- badges et historique d’opérations ;
- missions, VR, tapes, contacts et dossiers débloqués ;
- trois slots indépendants ;
- export/import JSON du slot actif ;
- synchronisation volontaire des records Free Play déjà existants ;
- améliorations permanentes appliquées réellement au loadout Side Ops ;
- choix de branche exclusifs enregistrés par slot ;
- archive des fins obtenues ;
- New Game+ conservant XP, ressources, améliorations, badges et fins découvertes.

Le slot 1 peut reprendre automatiquement les anciennes sauvegardes lors de sa première initialisation. Les slots 2 et 3 restent vierges jusqu’à leur création. Le bouton **SYNC ALL MODULES** importe les performances globales dans le slot actif.

Les clés principales sont `campaign-progress-slot_1`, `campaign-progress-slot_2`, `campaign-progress-slot_3`, `campaign-active-slot` et `campaign-launch-directive`. Le schéma global de sauvegarde est désormais en version 6 et le schéma Campaign Progress en version 2.

Le détail technique est documenté dans `CAMPAIGN_OPS_REPORT.md`.


## Campaign Builder & Branching Ops

Le module **CAMPAIGN BUILDER** permet de construire des campagnes complètes sans modifier les sources :

- bibliothèque locale multi-campagnes avec brouillon/publication ;
- graphe 2D déplaçable avec connexions de prérequis ;
- chapitres ajoutables et supprimables ;
- nœuds ciblant Campaign, Codec, Side Ops, VR, Tapes ou Lore ;
- conditions principales et conditions supplémentaires ;
- logique `ALL (AND)` ou `ANY (OR)` ;
- conditions de rank, ressources, badges, appels, cassettes et dossiers Lore ;
- branches exclusives par `groupId` et `optionId` ;
- fins héroïques, neutres, sombres ou secrètes ;
- récompenses XP, ressources, badges et déblocages ;
- validation des IDs, cycles, prérequis, dépendances et fins ;
- playtest direct dans Campaign Ops ;
- publication des campagnes custom dans le sélecteur Campaign Ops ;
- import/export d’une campagne ou d’un pack versionné avec manifest de dépendances.

Le document de départ inclut deux doctrines exclusives et deux fins afin de servir de modèle immédiatement exploitable. Une fois une doctrine choisie dans un slot, la route opposée passe à l’état `BLOCKED` jusqu’au reset ou au prochain cycle New Game+.

Les clés locales sont `campaign-builder-library` et `campaign-builder-preview-id`. Le détail du format est documenté dans `CAMPAIGN_BUILDER_REPORT.md`.

## Mission Builder & Content Pipeline

Le module **MISSION BUILDER** permet de créer des missions Side Ops sans modifier les fichiers source :

- bibliothèque locale multi-documents ;
- création, duplication, suppression, brouillon et publication ;
- métadonnées : titre, ID, auteur, ère, environnement, lieu, personnage, difficulté et ressources de départ ;
- stage 2D scrollable avec grille et coordonnées tactiques ;
- placement et déplacement par glisser-déposer de :
  - point de départ ;
  - plateformes et caisses ;
  - gardes et renforts ;
  - caméra et projecteur ;
  - keycard, porte et extraction ;
  - ration, chaff et munitions ;
  - secrets et boss ;
- inspecteur d’entités avec position, taille, HP et limites de patrouille ;
- éditeur d’objectifs ;
- routeur de triggers Codec compatible avec les conversations intégrées et les conversations custom du Studio ;
- validation des objectifs requis, entités critiques, coordonnées, IDs et références Codec ;
- **PLAYTEST** direct dans le runtime Phaser existant ;
- publication dans le Mission Select Side Ops ;
- import/export d’une mission ou de toute la bibliothèque au format JSON versionné ;
- manifeste de pack avec dépendances contacts, conversations, items, ennemis et boss.

Les documents sont stockés via `shadow-codec-ops:mission-builder-library`. Le dernier brouillon armé en playtest utilise `shadow-codec-ops:mission-builder-preview-id`.

Le format détaillé est documenté dans `MISSION_BUILDER_REPORT.md`.

## Side Ops Missions

Le module **SIDE OPS** propose maintenant une sélection de missions jouables :

- `Mission 001 — Dock Infiltration` : vertical slice Shadow Moses, keycard, projecteur, boss Armored Guard Captain ;
- `Mission 002 — Tanker Hold Sabotage` : route Tanker/MGS2 simulation avec plus de patrouilles, bulkhead lock, long deck, nouveaux secrets et boss Shielded Deck Commander.

Chaque mission possède :

- ses objectifs ;
- ses positions de plateformes, gardes, caméra, projecteur, boss et extraction ;
- ses conversations Codec dédiées ;
- son meilleur score local ;
- ses entrées Lore/Tape associées.

## VR Missions

Le module **VR MISSIONS** propose maintenant une couche de défis courts séparée du Side Ops principal :

- `Dock Sprint` : Time Attack ;
- `Ghost Dock` : No Alert ;
- `SOCOM Range` : Weapon Training ;
- `Quiet CQC` : challenge non létal ;
- `Chaff Breaker` : surveillance/caméra ;
- `Armored Captain Duel` : boss challenge.

Chaque mission VR possède :

- catégorie ;
- difficulté ;
- briefing ;
- restrictions ;
- équipement conseillé ;
- objectifs chiffrés ;
- calcul de score ;
- rank local ;
- historique de records ;
- unlocks de tapes/badges selon le rank.

Depuis la v1.1, le module VR possède deux couches :

- **Playable VR Phaser Bridge** : lance une arène Phaser compacte pour la mission sélectionnée, avec contrôles réels, tirs, CQC, chaff, caméras, boss et sortie VR ;
- **Training Board** : reste disponible comme outil debug/balancing pour simuler rapidement des stats et tester les seuils de score.

Les scènes jouables renvoient automatiquement `timeSeconds`, alertes, tirs, hits, kills, CQC, dégâts, rations, caméras, objectifs, secrets et boss defeated vers `vrStorage`, ce qui permet de débloquer les tapes/badges VR avec les vraies performances.

Les données VR sont stockées en `localStorage` via `vr-mission-progress`, `vr-unlocked-tapes` et `shadow-codec-vr-active-mission-id`.

## Conversation Studio

Le module **STUDIO** permet de :

- créer une conversation Codec custom ;
- dupliquer une conversation intégrée pour en faire une version éditable ;
- modifier contact, fréquence, trigger, speaker, émotion, vitesse, glitch et lignes de dialogue ;
- prévisualiser le rendu dans un faux écran Codec avec skin basé sur l’era ;
- importer/exporter une conversation ou toutes les conversations custom en JSON ;
- sauvegarder des **trigger overrides** pour que Side Ops utilise localement une conversation custom sur un événement précis.

Les données Studio sont stockées en `localStorage` via les clés internes `studio-custom-conversations` et `studio-trigger-overrides`.


## Lore Database

Le module **LORE DB** permet maintenant de :

- parcourir une base locale par catégories : personnages, organisations, lieux, événements, fréquences, missions, items, ennemis, boss, tapes, VR et systèmes ;
- rechercher dans titres, résumés, tags, détails, alias, affiliations et liens ;
- filtrer par ère et par couche : canon reference, simulation layer, gameplay system ou custom local ;
- ouvrir des entrées générées automatiquement depuis les données existantes du projet ;
- consulter les relations vers contacts, conversations, missions, items, boss, tapes et VR ;
- utiliser les liens rapides pour retourner vers CODEC, SIDE OPS, TAPES, VR ou SETTINGS ;
- ajouter des favoris, conserver un historique de consultation et écrire des notes locales par entrée ;
- importer/exporter des entrées Lore custom en JSON ;
- exporter l’entrée sélectionnée, les entrées visibles, tout le bundle Lore ou l’état local favoris/notes/historique.

Les données Lore locales sont stockées via `lore-database-state` et `lore-custom-entries`.

## Tape Archive / iDroid Deck

Le module **TAPES** permet maintenant de :

- parcourir une bibliothèque de cassettes/briefings par catégorie ;
- filtrer par recherche, favoris ou historique ;
- lire une cassette en lecture simulée ;
- voir une waveform générée par CSS ;
- suivre le timecode et la progression ;
- sauter de ±10 secondes ;
- cliquer une ligne de transcription pour s’y placer ;
- marquer une cassette comme écoutée ;
- ajouter des favoris ;
- écrire une note locale par cassette ;
- importer des tapes custom depuis JSON ;
- exporter la cassette sélectionnée, les tapes visibles ou l’état progression/favoris ;
- afficher les tapes conditionnelles verrouillées par les VR Missions ;
- déverrouiller localement des tapes VR via les ranks du module VR.

Les données Tape Archive sont stockées en `localStorage` via `tape-archive-state` et `tape-custom-tapes`.

## Notes lore / données

Les fréquences MSX/MG2, MGS2 et MGS3 ajoutées en v0.6 suivent les tableaux des manuels / sources de référence disponibles. Les packs MGS4 et MGSV utilisent des **canaux de simulation** parce que ces interfaces ne reposent pas sur le même fonctionnement de fréquence classique dans l’app.

Les conversations, tapes et missions fournies sont des textes originaux de simulation, conçus pour relier le Codec, Side Ops, VR Missions, Mother Base et les futurs modules sans inclure d’assets officiels. Les assets visuels sont des placeholders générés par code avec Phaser/CSS, aucun asset officiel n'est inclus.

## v1.2.0 — Passe 13: Tauri/Desktop polish

- Native desktop status and controls in Settings.
- Fullscreen support in both browser and Tauri builds.
- Maximize/restore and reset-to-1280x720 commands for Tauri.
- Automatic window position/size restoration via `tauri-plugin-window-state`.
- Browser `localStorage` remains the synchronous runtime cache.
- Tauri builds mirror the complete application save namespace into an on-disk `tauri-plugin-store` file.
- Portable full-backup import/export in JSON.
- Hardened Tauri CSP and explicit desktop capabilities.
- App metadata, installer targets and generated multi-platform icon set.
- New verification scripts: `npm run desktop:check`, `npm run tauri:build:debug`, and `npm run tauri:icon`.

### Desktop verification

```bash
npm install
npm run build
npm run desktop:check
npm run tauri:dev
npm run tauri:build
```

The native commands require the Rust toolchain and the platform prerequisites documented by Tauri.
## v1.3.0 — Passe 14 : Performance & architecture polish

- Les routes principales utilisent maintenant `React.lazy` et `Suspense`.
- Le survol/focus de la navigation précharge le module correspondant sans bloquer le démarrage.
- Phaser est produit dans un chunk `phaser-engine` séparé et n’est téléchargé qu’à l’ouverture de Side Ops ou VR.
- `GameConfig` importe uniquement la scène Phaser nécessaire : Side Ops ou VR Training.
- Un écran de boot initialise le stockage desktop, exécute les migrations et garde un mode de secours local en cas d’échec.
- Un Error Boundary global et un Error Boundary par route empêchent une panne de module de faire tomber toute l’application.
- Les cinq derniers diagnostics de crash React sont conservés localement dans `shadow-codec-ops:crash-reports`.
- Le schéma de sauvegarde est versionné et les anciennes clés non préfixées sont migrées automatiquement.
- Le diagnostic de démarrage est stocké sous `shadow-codec-ops:runtime-diagnostics`.

### Résultat du build v1.3.0

```text
Application initiale : ~18.5 kB JS (hors React)
React partagé : ~142.9 kB
Phaser différé : ~1.48 MB, chargé uniquement pour Side Ops/VR
Build TypeScript + Vite : validé
```


## v1.4.0 — Passe 15 : QA, accessibilité et contrôles

- Remapping clavier partagé entre React et Phaser.
- Gestion des conflits avec permutation automatique des touches.
- Support manette standard et vibration optionnelle.
- Contrôles utilisés dans Side Ops, VR Training et Mission Complete.
- Modes reduced motion, reduced flashes, high contrast et large text.
- Respect automatique de `prefers-reduced-motion`.
- Skip link, focus visible, `aria-current` et annonces optionnelles des routes.
- Runtime Diagnostics visible et exportable depuis Settings.
- Schéma de sauvegarde v3 avec migration automatique des anciens réglages.
- Vitest et JSDOM ajoutés au projet.
- Tests d’intégrité des références JSON.
- Correction des anciennes références Tape Archive détectées par la QA.
- Rapport détaillé disponible dans `QA_REPORT.md`.


## v1.5.0 — Passe 16 : Mobile/PWA et contrôles tactiles

- Manifest PWA, service worker Workbox et mode hors ligne contrôlé.
- Installation standalone avec raccourcis Codec, Side Ops, VR et Mission Builder.
- Safe areas iOS/Android et recommandation paysage.
- HUD tactile multi-touch rétractable pour Side Ops et VR.
- Mode tactile auto/forcé/désactivé, taille, opacité et vibration configurables.
- Service worker neutralisé dans Tauri pour éviter les conflits desktop.

## v1.6.0 — Passe 17 : Side Ops Mission Builder & Content Pipeline

- Nouveau module lazy-loadé `MissionBuilder`.
- Bibliothèque locale de documents versionnés.
- Stage visuel scrollable avec placement, sélection, drag, duplication et inspecteur.
- Éditeur de métadonnées, objectifs et triggers Codec.
- Validation bloquante avant publication/playtest.
- Conversion automatique des documents vers `MissionDefinition` et profil runtime `SideOpsMissionProfile`.
- Missions custom publiées et brouillons de playtest visibles dans le Mission Select.
- Import/export de packs JSON avec manifeste de dépendances.
- Tests unitaires du sanitizer, validator, converter et pack pipeline.
- Correction du comptage d’objectifs Side Ops lors de l’entrée dans l’arène du boss.

## v1.7.0 — Passe 18 : Campaign Ops & Progression Layer

- route lazy-loadée Campaign Ops ;
- campagne Legacy Signal en deux chapitres ;
- graphe de nœuds multi-modules ;
- XP, niveau, ressources, badges et récompenses ;
- ranks Side Ops/VR utilisés comme conditions ;
- trois slots de campagne séparés ;
- New Game/Continue, reset, export/import JSON ;
- migration et synchronisation des anciennes sauvegardes ;
- launch directives vers Codec, Side Ops, VR, Tapes et Lore ;
- améliorations permanentes réellement appliquées au loadout Side Ops ;
- tests d’idempotence, de ranks, d’achats et d’isolation des slots.


## v2.1 — Voice packs and animated portraits

Settings now includes a **Voice & Portrait Pack Manager**. Private/local audio and portraits can be installed through a versioned JSON manifest without bundling protected assets.

Assets belong in:

```text
public/audio/custom/
public/portraits/custom/
```

The Codec resolves enabled voice replacements per conversation line and portrait replacements per character/expression. Animated portraits react to the active speaker and respect reduced-motion preferences.

See `VOICE_PACK_REPORT.md` for the manifest format.


## Codec Director Mode

Le module **DIRECTOR** permet de créer des transmissions narratives réutilisables dans plusieurs contextes :

- `standalone` pour le playtest ;
- `codec` depuis le simulateur ;
- `campaign` depuis Campaign Ops ;
- `sideops` comme briefing et directive terrain ;
- `vr` pour de futurs scénarios d'entraînement.

Nœuds disponibles :

- `line` : dialogue localisé, audio, émotion, expression et camera cue ;
- `choice` : options conditionnelles et effets ;
- `interrupt` : insertion d'une séquence prioritaire avec reprise ou remplacement ;
- `event` : émission d'un événement cross-module ;
- `delay` : pause temporisée ;
- `jump` : saut vers un autre nœud ;
- `end` : outcome et archivage du run.

Les séquences custom utilisent la clé `director-custom-sequences`. Les événements et résultats sont conservés dans `director-event-log` et `director-outcomes`. Le schéma global de sauvegarde est en version 12.

Le rapport détaillé se trouve dans `DIRECTOR_MODE_REPORT.md`.


## Passe Codec 1 — Core Fidelity — COMPLETE (v2.3.0)

- 17 contextes Codec couvrant les principales ères déjà intégrées ;
- profils de joueur dépendants du chapitre et de la mission ;
- 26 règles de disponibilité de contact entièrement pilotées par les données ;
- contacts disponibles, verrouillés, entrants uniquement, brouillés, morts ou inconnus ;
- déblocage par contexte, drapeau de mission ou mémoire Codec ;
- résolution des fréquences partagées sans sélection silencieuse du premier contact ;
- routeur de canal pour choisir Campbell ou Naomi sur 140.85 ;
- sujets d'appel, descriptions et rotation vers les conversations les moins entendues ;
- appels entrants routine/priorité/urgence avec délai d'expiration ;
- Accept, Ignore, Required Call, Missed Call et file d'attente persistante ;
- événements externes `shadow-codec:incoming-call` pour les autres modules ;
- historique avec dispositions completed/aborted/ignored/missed/failed et rappel ;
- trois slots locaux de sauvegarde/restauration du contexte Codec ;
- Conversation Studio compatible sujets, libellés et restrictions de contexte ;
- migration du schéma global vers la version 11 ;
- 75 tests automatisés et build/PWA validés.

La Passe 24 Director Timeline Advanced reste volontairement mise de côté. La priorité suivante est **Passe Codec 5 — Content & Assets**, afin de compléter portraits, expressions, sons d’interface, ambiances radio, conversations contextuelles et packs visuels/audio par époque.


## Passe Codec 2 — Visual Identity — COMPLETE (v2.4.0)

- profils visuels centralisés dans `codecVisualIdentity.ts` ;
- composant `CodecVisualStage` avec neuf layouts ;
- terminal MSX entièrement textuel et pixelisé ;
- Codec MGS1 à doubles portraits et fréquence centrale ;
- Codec MGS2 sous forme de HUD numérique bleu et panneaux biseautés ;
- radio MGS3 avec boîtier, écran LCD, jauges, molettes et tuner analogique ;
- Codec MGS4 en appel vidéo large avec sidebar tactique et lower-third ;
- interface Peace Walker sous forme de dossier MSF papier avec onglets et fiches personnel ;
- iDroid MGSV avec navigation latérale, waveform, carte Intel et dock de commandes ;
- layouts VR et Patriots dédiés ;
- CALL, historique, mémoire et sauvegarde renommés selon l’époque ;
- overlays d’appels entrants et panneaux latéraux adaptés à chaque identité ;
- animations par état Codec avec fallback reduced-motion ;
- pack `peace_walker_msf` ajouté aux thèmes ;
- 79 tests automatisés et build/PWA validés.


## Passe Codec 3 — Canon Data Expansion — COMPLETE (v2.5.0)

- [x] 55 contacts répartis entre MSX/MG2, MGS1, MGS2, MGS3, MGS4, Peace Walker, MGSV, VR et Patriots.
- [x] 32 contextes de jeu/chapitre/mission.
- [x] 55 règles de disponibilité contextuelle.
- [x] 102 conversations bilingues originales marquées comme simulation lore-compatible.
- [x] Registre de 13 sources et provenance par contact/conversation.
- [x] 56 variantes de canal, dont 30 variantes numériques canoniques.
- [x] Fréquences alternatives par contexte et sujet.
- [x] Canaux réseau/MSF/iDroid explicitement séparés des fréquences officielles.
- [x] Canon Data Dossier visible dans le Codec.
- [x] Canon Coverage Matrix synchronisée avec les données réelles.
- [x] 86 tests automatisés et build/PWA validés.

## Passe Codec 4 — Radio Scan & Signal Intelligence — COMPLETE (v2.6.0)

- [x] Spectre radio SVG interactif avec vue par époque et zoom local.
- [x] Clic sur le spectre, pas fin, recherche des pics et balayage automatique.
- [x] 24 signaux contextuels répartis sur MSX, MGS1, MGS2, MGS3, MGS4, Peace Walker, MGSV, VR et Patriots.
- [x] Contacts connus, contacts classifiés, interceptions, numbers stations, paquets chiffrés, anomalies et leurres.
- [x] Émissions intermittentes et fréquences à dérive temporelle.
- [x] Verrouillage avec seuil de puissance de 72 %.
- [x] Puzzles codeword, séquence de fréquences, checksum et clé contextuelle.
- [x] Journal persistant des découvertes, notes, tentatives, Intel et déchiffrements.
- [x] Récompenses avec points Intel, badges, contacts et conversations.
- [x] Export JSON du dossier Signal Intelligence.
- [x] Migration globale vers le schéma 12.
- [x] 98 tests automatisés et build/PWA validés.



## v2.7 Codec Content & Assets

Adds original built-in simulation portraits, era-specific procedural UI cues, connected ambience, an asset readiness deck and additional bilingual context calls. Local Voice Packs still override all built-in placeholders.


## v3.1 — MGS1-C Encyclopedia

- 15 Shadow Moses zone files
- 24 weapon/item/equipment files
- visual relationship network
- 11-stage narrative timeline
- portrait/expression and story-variant catalogue for all 8 principal contacts
