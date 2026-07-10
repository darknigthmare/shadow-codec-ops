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

### Next suggested pass

Passe 24 — Director Timeline Advanced: courbes audio, marqueurs de synchronisation, conditions de contexte, undo/redo et export de packs Director complets.
