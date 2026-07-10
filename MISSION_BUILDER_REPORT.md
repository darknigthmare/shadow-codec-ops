# Shadow Codec Ops — Mission Builder Report v1.6.0

Validation effectuée le **2026-07-10**.

## Objectif

La Passe 17 ajoute un pipeline local d’auteur de contenu pour Side Ops. Un document créé dans l’interface peut être validé, lancé dans Phaser, publié dans le Mission Select et transporté vers une autre installation sous forme de pack JSON.

## Architecture

```text
MissionBuilder.tsx
  ├─ MissionBuilderLibrary local
  ├─ Stage / palette / inspector
  ├─ Objectives editor
  ├─ Codec trigger router
  ├─ Validation report
  └─ Import / export / playtest

missionBuilderStorage.ts
  ├─ sanitizeMissionBuilderDocument
  ├─ validateMissionBuilderDocument
  ├─ convertBuilderDocumentToMissionDefinition
  ├─ convertBuilderDocumentToSideOpsProfile
  ├─ createMissionContentPack
  └─ parseMissionBuilderImport

SideOpsLauncher.tsx
  └─ merges built-in missions + published/preview builder missions

SideOpsScene.ts
  └─ resolves a builder profile before falling back to built-in profiles
```

## Schéma du document

Chaque `MissionBuilderDocument` contient :

- `schemaVersion: 1` ;
- identité, titre, description, auteur ;
- ère et environnement ;
- lieu, personnage principal et difficulté ;
- largeur du monde et ressources de départ ;
- état `published` ;
- objectifs ;
- triggers Codec ;
- entités placées ;
- dates de création et modification.

## Entités disponibles

```text
player_start
platform
crate
guard
reinforcement
keycard
door
camera
searchlight
elevator
pickup_ration
pickup_chaff
pickup_ammo
secret
boss
```

Les plateformes utilisent `scaleX`. Les gardes utilisent `patrolMin`, `patrolMax` et `hp`. Le projecteur utilise `scaleX` comme largeur de balayage. Le boss utilise `hp` et son label comme nom runtime.

## Flux d’objectifs requis

Le runtime Side Ops actuel attend les IDs suivants :

```text
recover_keycard
open_security_door
cross_security_yard
defeat_captain
extract
```

Un objectif initial libre peut être ajouté avec `completedByDefault: true`. La validation bloque le playtest si un ID requis manque.

## Validation

Erreurs bloquantes :

- titre ou ID absent ;
- largeur de monde invalide ;
- entités requises manquantes ;
- plateforme absente ;
- coordonnées hors monde ;
- IDs d’entités dupliqués ;
- limites de patrouille invalides ;
- objectif runtime requis absent ;
- contact ou conversation Codec inconnue.

Avertissements/informations :

- peu d’objectifs ;
- plusieurs entités critiques du même type ;
- absence de garde, caméra, projecteur ou secret ;
- briefing/debriefing Codec absent ;
- document encore en brouillon.

## Playtest et publication

- **Playtest** sauvegarde le document, arme son ID comme preview et sélectionne automatiquement la mission dans Side Ops.
- **Publish** rend la mission visible dans le Mission Select lors des prochaines ouvertures du module.
- Les missions intégrées restent intactes et sont marquées `BUILT-IN`.
- Les missions du Builder sont marquées `CUSTOM PUBLISHED` ou `CUSTOM PLAYTEST`.

## Format de pack

Un `MissionContentPackManifest` inclut :

```json
{
  "schemaVersion": 1,
  "packId": "example_pack",
  "name": "Example Mission Pack",
  "version": "1.0.0",
  "author": "Darknigthmare",
  "description": "...",
  "exportedAt": "ISO-8601",
  "missions": [],
  "dependencies": {
    "contacts": [],
    "conversations": [],
    "items": [],
    "enemies": [],
    "bosses": []
  }
}
```

L’import accepte :

- un pack avec `missions` ;
- une bibliothèque avec `documents` ;
- un document de mission isolé.

## Compatibilité Codec Studio

Le routeur affiche :

- les conversations intégrées ;
- les conversations custom enregistrées par le Conversation Studio.

Les triggers du document deviennent les appels runtime utilisés pour briefing, alerte, santé, sécurité, boss, secrets et débriefing. Lorsqu’un événement précis n’a pas de route dédiée, le converter utilise un fallback cohérent pour l’ère choisie.

## Limites actuelles

- le runtime utilise la première entité Start, Keycard, Door, Boss et Extraction ;
- le flux reste linéaire en cinq étapes ;
- un seul boss principal est supporté ;
- les caméras et projecteurs multiples seront ajoutés dans une extension future ;
- le Builder est optimisé pour desktop/tablette paysage, pas pour petit écran portrait ;
- les assets restent des placeholders procéduraux Phaser/CSS.

## QA

La suite ajoute cinq tests :

- document par défaut valide ;
- conversion vers MissionDefinition ;
- conversion vers profil Phaser ;
- sanitation des limites numériques et coordonnées ;
- export/import d’un pack versionné avec dépendances.
