# Shadow Codec Ops

Base de projet privée pour un **simulateur Codec tactique** avec un module **Side Ops 2D** old-school, un deck **Tape Archive / iDroid** et des **VR Missions** locales.

## Version actuelle

`1.0.0` — Passe 11 : **Side Ops Mission Pack 2 / multi-missions**.

## Contenu actuel

- React + Vite + TypeScript
- Structure prête pour Tauri Desktop
- Codec Simulator V1 jouable : fréquence, CALL, MEMORY, conversations, historique
- **Packs visuels sélectionnables** :
  - MSX Military Radio
  - Classic MGS1 Codec
  - MGS2 Digital Codec
  - MGS3 Survival Radio
  - MGS4 Modern Codec
  - MGSV iDroid / Cassette Deck
  - VR Training Grid
  - Patriots AI Corruption
- Galerie de thèmes dans Settings avec description, layout, humeur et effets
- Sélecteur d’époque + sélecteur de skin directement dans l’écran Codec
- Panneau **Visual Pack Status** avec description de l’era, contacts connus, contacts mémoire et effets actifs
- Contacts/conversations de base ajoutés pour MSX/MG2, MGS2, MGS3, MGS4 simulation, MGSV simulation, VR et Patriots AI
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
- **Mission Select Side Ops** avec deux missions jouables et meilleurs scores séparés par mission
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
- Conversation Studio : création, duplication, édition, prévisualisation Codec, import/export JSON
- Trigger overrides locaux : une conversation custom peut remplacer un appel Codec Side Ops selon mission + trigger
- Conversations custom visibles dans le Codec Simulator et les appels Side Ops
- Meilleur score local sauvegardé séparément pour chaque mission Side Ops
- Rank final détaillé : stealth score, objectifs, secrets, boss, alertes, renforts, kills, neutralisations, tirs, dégâts, rations, caméras
- Données JSON locales : eras, contacts, conversations, missions, items, ennemis, boss, thèmes, tapes, vrMissions, loreEntries
- Build web vérifié avec `npm run build`

## Installation

```bash
npm install
npm run dev
```

## Build web

```bash
npm run build
npm run preview
```

## Desktop Tauri

Installer les prérequis Tauri/Rust, puis :

```bash
npm run tauri:dev
npm run tauri:build
```

## Contrôles Side Ops

- Flèches / WASD : déplacement
- Shift : marche lente, réduit la détection sonore
- Haut / W : saut
- Bas / S : accroupi, réduit fortement la détection visuelle
- J : tir SOCOM
- Espace : CQC non létal proche
- F : chaff grenade contre caméra et projecteur
- R : ration si blessé
- C : demande Codec manuelle
- ENTER / ESC sur l’écran de fin : rejouer la mission

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

Le Training Board VR est volontairement léger pour l’instant : il sert de simulateur d’évaluation et de progression locale avant de connecter ces défis à de vraies scènes Phaser dédiées.

Les données VR sont stockées en `localStorage` via `vr-mission-progress` et `vr-unlocked-tapes`.

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
