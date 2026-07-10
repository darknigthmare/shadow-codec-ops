# Campaign Builder & Branching Ops — v1.8.0

Validation effectuée le **2026-07-10**.

## Objectif

La Passe 19 ajoute un outil local permettant de créer et tester des campagnes complètes sans modifier les fichiers source. Les campagnes personnalisées utilisent le même moteur de progression que `Legacy Signal` et peuvent relier Codec, Side Ops, VR Missions, Tape Archive, Lore et milestones de campagne.

## Bibliothèque et documents

Le module gère :

- plusieurs campagnes locales ;
- brouillons et campagnes publiées ;
- duplication et suppression ;
- métadonnées auteur/version/source ;
- chapitres ordonnés ;
- prévisualisation directe dans Campaign Ops ;
- import/export JSON et packs avec manifest de dépendances.

Clés locales principales :

```text
campaign-builder-library
campaign-builder-preview-id
```

## Graphe visuel

Chaque chapitre possède un graphe déplaçable :

- position libre des nœuds ;
- connexions SVG de prérequis ;
- inspecteur du nœud sélectionné ;
- modules Campaign, Codec, Side Ops, VR, Tape et Lore ;
- cibles issues des données intégrées et du Mission Builder ;
- récompenses XP, ressources, badges et unlocks.

## Conditions

Un nœud peut combiner une condition principale et plusieurs conditions supplémentaires :

- `ALL / AND` : toutes les conditions doivent être remplies ;
- `ANY / OR` : une seule condition suffit.

Conditions prises en charge :

- prérequis terminés ;
- appel Codec/contact/conversation ;
- mission Side Ops et rank minimum ;
- VR Mission et rank minimum ;
- cassette écoutée ;
- dossier Lore consulté ;
- ressources minimales ;
- badge possédé ;
- milestone de campagne.

## Embranchements et fins

Les branches exclusives utilisent un `groupId` et plusieurs `optionId` :

- le nœud non choisi passe à `BLOCKED` ;
- le choix est enregistré séparément dans chaque slot ;
- les prérequis et la progression tiennent compte des routes bloquées ;
- les fins peuvent être `heroic`, `neutral`, `dark` ou `secret` ;
- les fins obtenues sont archivées dans Campaign Ops.

## New Game+

Après une fin, le joueur peut démarrer un nouveau cycle :

- le graphe, les preuves de module et les choix de branche sont réinitialisés ;
- XP, niveau, ressources, améliorations, badges et fins découvertes sont conservés ;
- le compteur `newGamePlusCycle` est incrémenté ;
- les routes opposées redeviennent disponibles.

## Campagne intégrée mise à jour

`Legacy Signal` contient maintenant :

- 3 chapitres ;
- 14 nœuds ;
- une doctrine finale à deux routes exclusives ;
- 2 fins alternatives : `Silent Signal` et `Open Signal`.

## Validation

Le pipeline vérifie :

- IDs dupliqués ;
- références de prérequis ;
- cycles ;
- dépendances vers missions, VR, tapes, contacts et Lore ;
- groupes de branche incomplets ;
- fins absentes ou invalides ;
- documents importés et collisions d’identifiants.

Les tests automatisés couvrent le document de départ, les cycles, les packs, les choix exclusifs, les fins, les conditions AND/OR et New Game+.
