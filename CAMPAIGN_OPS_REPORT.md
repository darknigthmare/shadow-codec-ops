# Campaign Ops, Branching & Narrative Layer — v1.9.0

## Objectif

Campaign Ops relie Codec, Side Ops, VR Missions, Tape Archive et Lore dans une progression persistante. La Passe 20 ajoute les briefings/débriefings, événements narratifs, variables persistantes, décisions plein écran, archives et statistiques de campagne.

## Campagne intégrée

`src/data/campaigns.json` contient **Legacy Signal** :

- Chapitre I — Shadow Moses Signal ;
- Chapitre II — Tanker Intercept ;
- Chapitre III — Final Doctrine ;
- 14 nœuds connectés ;
- conditions Codec, Side Ops, VR, Tape, Lore, ressources, badges et milestones ;
- choix final Ghost Doctrine / Direct Action Doctrine ;
- fins `Silent Signal` et `Open Signal`.

## Progression

`src/systems/campaignStorage.ts` gère :

- réconciliation idempotente des nœuds ;
- conditions principales et supplémentaires en logique ALL/ANY ;
- comparaison des ranks ;
- XP et niveau opérateur ;
- Command Points, Intel, Supplies et Credits ;
- unlocks, badges et historique ;
- launch directives entre modules ;
- achats d’améliorations ;
- trois slots indépendants ;
- export/import JSON ;
- choix de branche par slot ;
- archive des fins ;
- New Game+.

## États des nœuds

```text
LOCKED   prérequis ou conditions non remplis
ACTIVE   nœud accessible
CHOICE   option de branche exclusive disponible
BLOCKED  route opposée au choix enregistré
COMPLETE objectif validé et récompense distribuée
```

Les nœuds bloqués ne sont pas comptés dans le dénominateur de complétion du run actif.

## Slots et branches

- chaque slot possède ses preuves, ressources, améliorations, choix et fins ;
- sélectionner une branche verrouille les autres options du même groupe ;
- les campagnes custom publiées apparaissent dans Campaign Ops ;
- une campagne armée en preview est sélectionnée automatiquement ;
- seule la campagne active reçoit les validations et récompenses.

Clés principales :

```text
campaign-progress-slot_1
campaign-progress-slot_2
campaign-progress-slot_3
campaign-active-slot
campaign-launch-directive
campaign-builder-library
campaign-builder-preview-id
```

## New Game+

Après obtention d’une fin :

- les nœuds, preuves et choix sont réinitialisés ;
- les routes exclusives redeviennent accessibles ;
- XP, niveau, ressources, requisitions, badges et fins découvertes sont conservés ;
- le cycle New Game+ est incrémenté.

## Migration

Le schéma global passe à la version 7. Les états campagne sont migrés vers Campaign Progress schema 3 avec :

```text
branchChoices
achievedEndingIds
newGamePlusCycle
variables
seenPresentationIds
presentationHistory
```

## Tests

- récompenses attribuées une seule fois ;
- ranks Side Ops/VR ;
- isolation/export/import des slots ;
- choix de branche et route bloquée ;
- fins ;
- logique AND/OR ;
- New Game+ ;
- intégrité des campagnes intégrées et custom.
