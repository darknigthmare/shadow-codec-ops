# Régénérer les fiches d’animation

Ces deux scripts écrivent exclusivement dans le dossier d’audit. Ils ne modifient pas le jeu.

1. `extract-animation-catalog.cjs` lit les catalogues de corps dans l’ordre du module Versus et résume les groupes, régions, directions, références et limites. Il lit aussi le profil optionnel de Parallaxe. Exemple :

   ```bash
   node docs/audit-cqc-2026-10-23/scripts/extract-animation-catalog.cjs /tmp/cqc-animation-catalog.json
   ```

2. `build-animation-audit.py` rapproche cette extraction avec les captures JSON du runtime final. Les chemins des snapshots sont des arguments, afin de ne pas incorporer une dépendance à une machine dans le dossier de production :

   ```bash
   python docs/audit-cqc-2026-10-23/scripts/build-animation-audit.py \
     --runtime /chemin/vers/runtime-probe.json \
     --detailed /chemin/vers/runtime-detailed.json \
     --catalog /tmp/cqc-animation-catalog.json \
     --resolved /chemin/vers/sprite-routing.json
   ```

Le premier snapshot fournit `fighters` et `finishers` après les extensions ; le deuxième fournit `costumeOptions` et `wardrobeAvailability` ; le troisième est l’extraction native ; le dernier contient les correspondances retournées par `CQC_COMBAT_SPRITES.actionName`, les groupes effectifs et les routes machine.

**Périmètre fixe :** les fichiers de cet audit se rapportent au code `ba4e30a09e9e95727b75a665e7b6ab07d9941aea`. Il faut utiliser les scripts de jeu et snapshots correspondant à ce même état. Pour une nouvelle version, produire un nouvel audit et mettre à jour explicitement la référence, plutôt que de mélanger un nouveau runtime et ce numéro de commit.

Les CSV contiennent les storyboards complets ; les JSON de fiches évitent de dupliquer ces longs textes et gardent identités, liens, paramètres, états communs et preuves. Le dossier `animations` conserve la version lisible complète, dix acteurs maximum par chapitre. Parallaxe a une fiche séparée et n’entre pas dans les totaux du roster par défaut.

L’extraction résout des déclarations et des groupes, pas le rendu de chaque PNG, toutes les phases d’une animation ni tous les costumes chargés à la demande. Les descriptions sont des spécifications de production CQC. Elles ne certifient pas une chorégraphie originale Konami.
