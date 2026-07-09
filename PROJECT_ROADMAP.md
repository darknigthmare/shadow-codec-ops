# Shadow Codec Ops — Project Roadmap

## État actuel

Version `1.0.0` — Passe 11 terminée.

Le projet contient maintenant :

1. App React/Vite/TypeScript.
2. Structure Tauri prête.
3. Codec Simulator V1 : fréquence, CALL, MEMORY, historique, conversations JSON.
4. Contacts MGS1 + conversations multi-époques.
5. Side Ops 2D jouable sous Phaser.
6. Gameplay core : déplacement, tir, CQC, ration, chaff, keycard, porte, caméra, projecteur, gardes, boss, extraction.
7. Alert System complet : NORMAL / SUSPICION / ALERT / EVASION / CAUTION / MISSION FAILED.
8. Mission 001 complète avec objectifs, boss, secrets, score et mission failed.
9. Conversation Studio complet : création, duplication, édition, prévisualisation, import/export, overrides de triggers.
10. Packs visuels Codec : MSX, MGS1, MGS2, MGS3, MGS4, MGSV/iDroid, VR, Patriots AI.
11. Contacts et conversations multi-époques pour tester les packs.
12. Settings enrichis avec galerie de thèmes.
13. **Tape Archive / iDroid Deck** complet : bibliothèque, playback simulé, waveform, transcriptions, favoris, notes, historique, import/export JSON.
14. **VR Missions** complet en première version : mission select, training board, score, ranks, records, unlocks tapes/badges.
15. Tape Archive branché aux unlocks VR pour afficher/verrouiller les tapes conditionnelles.
16. **Lore Database** complète : recherche, filtres, favoris, historique, notes, import/export et liens inter-modules.
17. Entrées Lore générées depuis contacts, fréquences, missions, items, ennemis, boss, tapes et VR Missions.
18. Side Ops Mission Select avec deux missions jouables.
19. Mission 002 — Tanker Hold Sabotage : nouvel environnement, nouvelles patrouilles, boss dédié, Codec MGS2, secrets et meilleur score local par mission.
20. Build web vérifié.

## Passes réalisées

### Passe 1 — Base Architecture

- App shell
- Navigation
- Données JSON
- Tauri scaffold
- Side Ops placeholder
- Codec placeholder

### Passe 2 — Codec Simulator V1

- Fréquence réglable
- CALL
- MEMORY
- Conversations ligne par ligne
- Historique
- Signal scanner

### Passe 3 — Side Ops Gameplay Core

- Joueur Phaser
- Tir SOCOM
- Munitions
- Ration
- CQC
- Chaff
- Porte/keycard
- HUD synchronisé

### Passe 4 — Alert System complet

- Suspicion
- Alert
- Evasion
- Caution
- Projecteur
- Renforts
- Timeline alerte
- Score furtivité temps réel

### Passe 5 — Mission 001 complète

- Dock Infiltration vertical slice
- Objectifs intermédiaires
- Boss Armored Guard Captain
- Boss 2 phases
- Secrets
- Mission clear / failed
- Meilleur score local

### Passe 6 — Conversation Studio

- Création de conversations custom
- Édition complète des lignes
- Import/export JSON
- Preview Codec
- Trigger overrides Side Ops
- Sauvegarde locale

### Passe 7 — Packs visuels Codec

- `themes.json` enrichi
- CSS themes complets
- Sélecteur skin dans Codec + Settings
- Panneau Visual Pack Status
- Contacts/conversations MSX/MG2, MGS2, MGS3, MGS4 simulation, MGSV simulation, VR, Patriots AI
- Speaker labels multi-époques
- Signal meter et état Patriots corrupt

### Passe 8 — Tape Archive / iDroid Deck

- Nouveau composant `TapeArchive`
- Nouveau fichier `tapes.json`
- Nouveaux types `tape.types.ts`
- Nouveau stockage local `tapeStorage.ts`
- Lecture simulée avec timecode
- Waveform CSS générée à partir de l’ID de tape
- Catégories : Mission, Intel, Character, Mother Base, Weapon, Anomaly
- Recherche, favoris, historique et progression locale
- Transcription cliquable avec ligne active
- Notes locales par cassette
- Import/export JSON de tapes custom
- Export cassette sélectionnée / tapes visibles / progression-favoris
- Styles `tapes.css`

### Passe 9 — VR Missions

- Nouveau composant `VRMissionsScreen`
- Nouveau fichier `vrMissions.json`
- Nouveaux types `vr.types.ts`
- Nouveau stockage/évaluation `vrStorage.ts`
- Mission select par catégorie : Time Attack, No Alert, Weapon Training, CQC, Surveillance, Boss Challenge
- Training Board local avec timer, objectifs, stats, accuracy, failures et projected rank
- Scoreboard local avec best selected run + recent records
- Déblocage local de badges et tapes selon le rank demandé
- Nouvelles tapes conditionnelles liées aux rewards VR
- Tape Archive compatible avec les locks VR
- Styles `vr.css`

### Passe 10 — Lore Database

- Recherche, filtres, favoris, historique, notes, import/export et liens inter-modules.

### Passe 11 — Side Ops Mission Pack 2

- Mission Select Side Ops
- Deuxième mission jouable : Tanker Hold Sabotage
- Nouvel environnement rain deck/cargo hold
- Nouvelles patrouilles et renforts Tanker
- Nouveau boss : Shielded Deck Commander
- Appels Codec MGS2 dédiés
- Meilleurs scores locaux séparés par mission
- Entrées Lore et Tape associées

## Prochaines passes recommandées

### Passe 12 — VR Phaser Bridge

- Brancher les VR Missions à de vraies scènes Phaser compactes
- Variante Time Attack de Dock Infiltration
- Variante No Alert
- Variante Weapon Range
- Variante Boss Arena
- Synchroniser les records réels avec `vrStorage`

### Passe 13 — Tauri/Desktop polish

- Icônes
- Config build exe
- Fenêtre native
- Mode fullscreen
- Sauvegarde desktop robuste
- Vérification bundle final
