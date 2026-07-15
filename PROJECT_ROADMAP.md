# Current priority

- **Codec Pass 6 — Export, Replay & Final Codec QA: COMPLETE (v2.8.0)**
- Director Timeline Advanced / former Pass 24 remains intentionally deferred.
- Next work should be a user-led polish/content pass rather than another large subsystem.
- **Character Art Expansion: COMPLETE** — 94 portraits for MGS2/MGS3 (55 + 39) and VR Character Pack 01 with four sprites under `public/vr/characters/`.

# Shadow Codec Ops — Project Roadmap

## État actuel

Version `2.0.0` — Passe 21 terminée.

Le projet réunit maintenant six piliers interconnectés :

1. **Campaign Ops** avec campagnes, trois slots, progression, ressources et déblocages.
2. **Codec Simulator** multi-époques avec fréquences, mémoire, appels et historique.
3. **Side Ops 2D / VR** Phaser avec missions intégrées, missions custom et défis jouables.
4. **Archives/édition** avec Conversation Studio, Tape Archive et Lore Database.
5. **Content Pipeline** avec Mission Builder et Campaign Builder, validation, playtest, publication et packs JSON.
6. **Narrative Presentation** avec briefings, événements persistants, choix plein écran, variables, archives et galerie des fins.

La même base fonctionne en web, PWA installable, Tauri desktop et interface tactile.

## Passes réalisées

### Passe 1 — Base Architecture
- React/Vite/TypeScript, navigation, données JSON, Tauri scaffold.

### Passe 2 — Codec Simulator V1
- Fréquence, CALL, MEMORY, conversations, historique et signal scanner.

### Passe 3 — Side Ops Gameplay Core
- Phaser, joueur, tir SOCOM, ration, CQC, chaff, porte/keycard et HUD.

### Passe 4 — Alert System
- Suspicion, Alert, Evasion, Caution, projecteur, renforts et score furtivité.

### Passe 5 — Mission 001
- Dock Infiltration, objectifs, boss, secrets, extraction et rank.

### Passe 6 — Conversation Studio
- Création/édition, preview, import/export et overrides de triggers.

### Passe 7 — Packs visuels Codec
- MSX, MGS1, MGS2, MGS3, MGS4, MGSV/iDroid, VR et Patriots AI.

### Passe 8 — Tape Archive / iDroid Deck
- Bibliothèque, lecture simulée, waveform, transcriptions, favoris et notes.

### Passe 9 — VR Missions
- Défis, training board, score, ranks, records et unlocks.

### Passe 10 — Lore Database
- Recherche, filtres, relations, favoris, notes et import/export.

### Passe 11 — Side Ops Mission Pack 2
- Mission 002 Tanker Hold Sabotage, nouveaux gardes, boss et Codec MGS2.

### Passe 12 — VR Phaser Bridge — COMPLETE (v1.1.0)
- Arènes VR jouables et retour des performances vers le système de ranks.

### Passe 13 — Tauri/Desktop polish — COMPLETE (v1.2.0)
- Plein écran, fenêtre persistante, store miroir, backup portable et icônes.

### Passe 14 — Performance & architecture — COMPLETE (v1.3.0)
- Lazy loading, chunk Phaser séparé, boot screen, Error Boundaries et migrations.

### Passe 15 — QA, accessibilité et contrôles — COMPLETE (v1.4.0)
- Remapping, manette, vibration, contraste, mouvements réduits, diagnostics et Vitest.

### Passe 16 — Mobile/PWA et tactile — COMPLETE (v1.5.0)
- Manifest, service worker, hors ligne, safe areas et HUD tactile multi-touch.

### Passe 17 — Side Ops Mission Builder & Content Pipeline — COMPLETE (v1.6.0)
- Bibliothèque locale, éditeur visuel, objectifs, triggers Codec, playtest, publication et packs JSON.

### Passe 18 — Campaign Ops & Progression Layer — COMPLETE (v1.7.0)

- [x] Route Campaign Ops lazy-loadée et raccourci PWA.
- [x] Campagne intégrée `Legacy Signal` en deux chapitres.
- [x] Graphe de nœuds Codec, Side Ops, VR, Tapes, Lore et milestones.
- [x] Prérequis, ranks minimums, nœuds optionnels et états locked/active/complete.
- [x] XP, niveau opérateur, Command Points, Intel, Supplies et Credits.
- [x] Récompenses idempotentes et journal d’opérations.
- [x] Déblocages de missions, VR, tapes, contacts, Lore et badges.
- [x] Launch directives vers chaque module concerné.
- [x] Enregistrement automatique des résultats depuis tous les modules.
- [x] Synchronisation rétrocompatible des anciennes sauvegardes.
- [x] Trois slots séparés avec New Game/Continue.
- [x] Export/import JSON du slot actif.
- [x] Migration du premier état historique vers le slot 1.
- [x] Améliorations permanentes appliquées au loadout Side Ops.
- [x] Quatre tests Campaign Ops + validation des références JSON.
- [x] Entrée Lore et rapport technique dédiés.

## Passe 19 — Campaign Builder & Branching Ops — COMPLETE (v1.8.0)

- [x] Route Campaign Builder lazy-loadée et raccourci PWA.
- [x] Bibliothèque locale multi-campagnes, brouillons et publication.
- [x] Graphe déplaçable avec liens de prérequis.
- [x] Éditeur de chapitres, nœuds, modules, cibles et récompenses.
- [x] Conditions multiples AND/OR.
- [x] Conditions de rank, ressources, badges, Codec, Side Ops, VR, Tapes et Lore.
- [x] Branches exclusives persistantes par slot.
- [x] Fins alternatives avec tons heroic/neutral/dark/secret.
- [x] Playtest direct et campagnes custom publiées dans Campaign Ops.
- [x] Import/export de packs campagne avec manifest de dépendances.
- [x] Validation des cycles, IDs, prérequis, branches et dépendances.
- [x] Chapitre III Final Doctrine ajouté à Legacy Signal.
- [x] New Game+ conservant progression méta et fins découvertes.
- [x] Migration du schéma global vers v6 et Campaign Progress vers v2.
- [x] Tests Campaign Builder, AND/OR, branches, fins et New Game+.

## Passe 20 — Campaign Presentation & Narrative Events — COMPLETE (v1.9.0)

- [x] Présentations plein écran de campagne, chapitre, opération et fin.
- [x] Scènes multi-beat avec speaker, ton, emphase et confirmation.
- [x] Briefings et débriefings globaux et par chapitre.
- [x] Événements narratifs conditionnels et persistants.
- [x] Variables string/number/boolean avec set/increment/decrement/toggle.
- [x] Condition `variable_compare` dans Campaign Ops et Campaign Builder.
- [x] Cartes de choix de branche plein écran avant confirmation.
- [x] Galerie des fins et épilogues rejouables.
- [x] Historique narratif par slot et New Game+.
- [x] Statistiques croisées Side Ops, VR, Codec, Tapes et Lore.
- [x] Authoring des présentations, variables et événements dans Campaign Builder.
- [x] Validation des IDs, cibles, mutations et dépendances narratives.
- [x] Migration globale vers le schéma 7, Campaign Progress vers le schéma 3 et packs Campaign Builder vers le schéma 2.
- [x] Correction QA empêchant la double application des mutations de nœud.
- [x] 44 tests automatisés et build/PWA validés.

## Prochaine passe recommandée

### Passe 21 — Narrative Audio, Localization & Subtitle Pipeline

- pistes audio locales optionnelles pour les scènes et cassettes ;
- filtre radio/Codec et ducking musical ;
- portraits et variantes émotionnelles par beat ;
- sous-titres horodatés et auto-advance ;
- tables de localisation FR/EN extensibles ;
- détection des textes manquants ;
- import/export de packs audio et langues ;
- options d’accessibilité pour vitesse, taille et lecture automatique.

## Extensions futures

- plusieurs portes/keycards et boss multiples dans le Mission Builder ;
- phases top-down hybrides ;
- éditeur de décor/tiles ;
- davantage de campagnes par époque ;
- audio custom local et voice filters ;
- partage optionnel de packs via dépôt GitHub communautaire.


## Passe 21 — Narrative Audio, Localization & Subtitle Pipeline — COMPLETE (v2.0.0)

- moteur de localisation EN/FR ;
- schéma de dialogue enrichi : texte localisé, timecodes, audio local, expression ;
- SubtitleTrack partagé ;
- export SRT EN/FR ;
- profils audio Codec par époque ;
- réglages narratifs persistants ;
- migration sauvegarde v8 ;
- 48 tests validés.

## Passe 22 — Voice Pack Manager & Animated Portrait Runtime — COMPLETE (v2.1)

- Local voice-pack manifests
- Per-line audio replacement
- Per-expression portrait replacement
- Animated speaker portraits
- Safe local asset validation
- Settings controls and save migration
- 50 automated tests

## Passe 23 — Codec Director Mode — COMPLETE (v2.2.0)

- [x] Route Codec Director lazy-loadée et raccourci PWA.
- [x] Nœuds line, choice, interrupt, event, delay, jump et end.
- [x] Choix conditionnels, variables et effets set/increment/decrement/toggle/emit.
- [x] Interruptions imbriquées avec reprise ou remplacement.
- [x] Runtime plein écran et timeline de progression.
- [x] Camera cues static, push-in, pull-back, shake, focus et glitch cut.
- [x] Bus d'événements cross-module.
- [x] Intégration Codec Simulator, Campaign Ops et Side Ops.
- [x] Conversion Conversation Studio → Director.
- [x] Import/export, validation et event monitor.
- [x] Migration du schéma global vers v10.
- [x] 59 tests automatisés et build/PWA validés.


## Passe Codec 1 — Core Fidelity — COMPLETE (v2.3.0)

- [x] Contextes de jeu/chapitre/mission data-driven.
- [x] Profils de personnage jouable par contexte.
- [x] Contact Availability Engine avec états available/locked/incoming-only/jammed/dead/unknown.
- [x] Règles par contexte, flags, mémoire et type d'appel.
- [x] Résolution des fréquences partagées et routeur de contact.
- [x] Menu de sujets par contact.
- [x] Rotation des conversations selon l'historique d'écoute.
- [x] Appels entrants avec priorité, acceptation, refus, expiration et file d'attente.
- [x] Appels obligatoires auto-acceptés à expiration.
- [x] Historique des appels manqués/ignorés et préparation du rappel.
- [x] Bus persistant d'appels entrants pour Campaign/Side Ops/VR.
- [x] Trois slots de sauvegarde Codec.
- [x] Conversation Studio compatible sujets et contextes.
- [x] Migration globale vers le schéma 11.
- [x] 75 tests automatisés et build/PWA validés.

## Passe Codec 2 — Visual Identity — COMPLETE (v2.4.0)

- [x] Profil visuel data-driven pour chaque époque.
- [x] Layout MSX terminal texte.
- [x] Layout MGS1 twin Codec classique.
- [x] Layout MGS2 HUD numérique.
- [x] Layout MGS3 radio analogique de terrain.
- [x] Layout MGS4 appel vidéo cinématique.
- [x] Layout Peace Walker dossier MSF dédié.
- [x] Layout MGSV iDroid holographique et waveform.
- [x] Layouts VR et Patriots spécialisés.
- [x] Libellés et commandes propres à chaque appareil.
- [x] CALL entrants, panneaux mémoire/historique/data visuellement adaptés.
- [x] Responsive mobile et reduced-motion.
- [x] Pack `peace_walker_msf` indépendant de MGSV.
- [x] 79 tests automatisés et build/PWA validés.

## Passe Codec 3 — Canon Data Expansion — COMPLETE (v2.5.0)

- [x] 55 contacts avec métadonnées jeu, année, alias, rôle et provenance.
- [x] 32 contextes de jeu/chapitre/mission.
- [x] 55 règles de disponibilité contextuelle.
- [x] 102 conversations bilingues originales lore-compatible.
- [x] 13 sources enregistrées et liées aux données.
- [x] Variantes de fréquence par contexte et sujet.
- [x] Canaux modernes identifiés comme routes réseau/MSF/iDroid de simulation.
- [x] Contacts Peace Walker/MSF, MGS4 et MGSV enrichis.
- [x] Canon Data Dossier dans le Codec.
- [x] Canon Coverage Matrix par époque.
- [x] 86 tests automatisés et build/PWA validés.

## Passe Codec 4 — Radio Scan & Signal Intelligence — COMPLETE (v2.6.0)

- [x] Spectre radio manuel et automatique.
- [x] Vue globale par époque et zoom local autour de la fréquence courante.
- [x] Pics de signal, force modulée par proximité et seuil de verrouillage.
- [x] 24 signaux contextuels et fréquences secrètes.
- [x] Signaux intermittents et porteuses à dérive temporelle.
- [x] Interceptions, contacts secrets, numbers stations, anomalies et leurres.
- [x] Messages cryptés avec codeword, séquence, checksum et clé de contexte.
- [x] Journal persistant des signaux découverts, décodés et annotés.
- [x] Récompenses Intel, badges, contacts et conversations.
- [x] Export JSON du dossier Signal Intelligence.
- [x] Migration globale vers le schéma 12.
- [x] 98 tests automatisés et build/PWA validés.

## Priorité suivante

### Passe Codec 5 — Content & Assets

- portraits complets et variantes émotionnelles par contact ;
- sons CALL, connexion, déconnexion et commandes propres à chaque époque ;
- ambiances radio, parasites et profils audio affinés ;
- conversations contextuelles supplémentaires par zone, équipement, santé et comportement ;
- packs d’assets locaux documentés et contrôlés ;
- audit final de cohérence visuelle/audio des sept appareils principaux.

### Mise de côté

- Passe 24 — Director Timeline Advanced, à reprendre après la finalisation du Codec.

## Completed — Codec Pass 5 / v2.7

- Original abstract portrait placeholders for all nine eras
- Era-specific procedural UI cue profiles
- Connected Codec ambience profiles
- Asset Deck and readiness matrix in Settings
- 18 additional localized context conversations
- Save schema 13 migration

## Next Codec Priority

Codec Pass 6 — Export, replay and final Codec QA. Director Pass 24 remains deferred.


## MGS1 Codec Pass A — COMPLETE (v2.9.0)

- [x] Eight principal MGS1 personnel profiles.
- [x] Ten Shadow Moses mission contexts.
- [x] Sixty MGS1 conversations.
- [x] Personnel dossier UI with biography, relations and topic directory.
- [x] Discovery completion metrics.
- [x] Miller/Liquid identity transition.
- [x] Deepthroat/Gray Fox reveal states.
- [x] 112 automated tests, build and PWA validation.

### Next MGS1 priority

MGS1-B: larger contextual conversation library, automatic incoming-call schedules, Mei Ling proverb rotation and weapon/boss topic expansion.


## MGS1 Codec Pass B — COMPLETE (v3.0.0)

- 137 MGS1 conversations
- 20 rotating original Mei Ling proverbs
- 12 Nastasha weapon and safety dossiers
- 9 major boss intelligence calls
- expanded Naomi medical, Otacon technical, Meryl field, Campbell objective and Deepthroat warning content
- one automatic incoming call for every Shadow Moses chapter context
- persistent one-shot schedule state
- live MGS1 library coverage indicator
- 115 automated tests passing

Next MGS1 pass: encyclopedic biographies, relationship graph, complete item/area catalog, portrait variants and final MGS1 QA.


## Completed — MGS1-C Encyclopedia (v3.1)
- Zone and equipment catalogues
- Relationship network
- Narrative timeline
- Portrait/expression variants

MGS1-D final polish and dedicated QA are complete in v3.2.

## Completed - MGS2 Complete Codec Layer (v3.2)

- seven principal Tanker/Plant contacts
- five mission contexts from Tanker to Arsenal Gear
- contextual incoming-call schedule
- personnel and system dossier UI
- identity transitions for Pliskin, Colonel and Mr. X
- zone, equipment, timeline and portrait catalogues
- 43 bilingual lore-grounded MGS2 conversations
- automated coverage and data-integrity tests

MGS3 now uses the same dossier and contextual-call standard in v3.3.

## Completed - MGS3 Survival Radio (v3.3)

- six complete radio channels
- three operation contexts
- survival, medical, food, wildlife, weapon and field-intelligence topics
- contextual incoming calls
- zone, equipment, timeline and portrait catalogues
- automated coverage tests

Next franchise priority: Peace Walker/MSF briefing and support network.

## Completed - Retractable Drawers, MGS1 Avatar Library & Side Ops Character Art (v3.4)

- main navigation converted to a closed-by-default left drawer after module selection
- Codec tools, dossiers and status converted to a closed-by-default right drawer
- backdrop, Escape key and accessible expanded-state handling
- full-width active modules on desktop and mobile
- 12 character-specific portraits for Solid Snake and Roy Campbell
- 42 additional portraits for Mei Ling, Naomi Hunter, Otacon, Nastasha Romanenko, Master Miller, Meryl Silverburgh and Deepthroat
- 54 MGS1 portraits total, with six emotional states per character resolved automatically by the Codec runtime
- eight Side Ops 2D sprites under `public/sideops/characters/`: MGS1/MGS2 Snake, four guard/reinforcement variants and two bosses
- all portraits and sprites are original fan-made creations inspired by official references, not extracted game assets

Character-art delivery status: 94 MGS2/MGS3 portraits and VR Character Pack 01 complete.

## Completed - MGS2/MGS3 Portrait Expansion & VR Character Pack 01

- 55 optimized MGS2 portraits covering player identities, seven support contacts, story expressions and the extra runtime state used by current conversations
- 39 optimized MGS3 portraits covering Naked Snake and the five distinct support characters while sharing art across the two Naked Snake IDs and the two Para-Medic channels
- alias-aware routing for Solid Snake/Pliskin, Mr. X/Olga, Naked Snake and Para-Medic identities
- fallback chain: local Voice Pack, requested built-in expression, same-character neutral portrait, then era system silhouette
- four delivered VR sprites under `public/vr/characters/` for `vrPlayer`, `vrTarget`, `vrGuard` and `vrBoss`, with legacy gameplay textures retained as fallbacks
- original fan-made visuals inspired by official references, never extracted game assets

## Completed - Franchise Codec Fidelity Audit (v3.5)

- official/manual-backed device and interaction profile for every era
- MG and MG2 visual differentiation with MG2 keypad treatment
- MGS2 restored to green monochrome illustrated Codec presentation
- MGS3 rebuilt as a muted 1964 radio overlay with MEM / SEND / TUNE controls
- MGS4 secure video link without fictional frequency tuning
- Peace Walker Real-Time Codec and Briefing Files distinction
- MGSV iDroid audio bus without classic frequency controls
- multi-tone procedural SFX signatures per hardware generation
- in-app fidelity profile with reference links

Next visual priority: post-delivery visual QA, polish and selection of the next era-specific character pack; MGS2/MGS3 production is no longer pending.
