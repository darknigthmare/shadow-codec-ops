Cette archive conserve les outils, jobs, livres de poses, mesures et calibrations manuelles d’une première sélection de travaux CQC. Elle contient 63 fichiers d’édition et référence 41 PNG natifs déjà sauvegardés dans les commits publics. Elle ne déclare aucun costume supplémentaire terminé.

Les chemins des fichiers exportés utilisent quatre marqueurs : `@PROJECT_ROOT@`, `@APP_ROOT@`, `@WORKSPACE_ROOT@` et `@SCRATCH_ROOT@`. L’hydrateur les remplace par les racines choisies. Les nombres, coordonnées, profils, SHA des images et pixels restent inchangés. Les fichiers compressés ont été décodés et inspectés avant leur export ; la restitution garantit leurs textes décodés, pas les anciens octets de leur conteneur gzip.

Pour matérialiser les fichiers dans un nouveau dossier, utiliser Python 3.9 ou supérieur et la commande suivante depuis cette archive :

```sh
python hydrate-editing-export.py . NOUVEAU_DOSSIER --manifest-sha256 3bcb8ed4228c59968467495948784c00aa57b736c6bb9eedfccbdde40c728237
```

Les options `--app-root`, `--workspace-root` et `--scratch-root` permettent de choisir les autres racines. Sans ces options, l’outil utilise des sous-dossiers explicites du nouveau dossier. Il vérifie tous les fichiers avant de commencer, refuse une destination existante et n’exécute aucun code restauré.

Les PNG ne sont pas dupliqués dans cette archive. Le manifeste `EDITING_NATIVE_SOURCE_BINDINGS.json` donne leurs chemins, tailles, SHA et URL Git immuables. Après avoir récupéré leurs octets vérifiés dans un dossier avec la même arborescence, ajouter ces options à la commande :

```sh
--native-source-directory DOSSIER_DES_SOURCES --native-bindings-sha256 ce52696da67391b394d3a5c52cde444db46b90e7bea997c069097f5de2aacb46
```

Une copie publique du dépôt au commit indiqué dans ce manifeste contient ces sources sous `docs/cqc-reprise/pass40/recovery-20261022`. Ce sous-dossier peut servir de `DOSSIER_DES_SOURCES`. L’outil vérifie les 41 PNG avant de les copier. Il ne devine aucune dépendance absente.

Le rapport local produit par l’hydrateur distingue les dépendances absentes, les empreintes concordantes et les entrées qui nécessitent de nouveaux pins. Les anciens dossiers d’application ou de référence ne sont pas inclus dans cet export. Ils doivent être récupérés séparément avant une reconstruction complète.

Les revues et approbations incluses sont des preuves historiques liées aux anciens octets. Après déplacement ou édition, les SHA des fichiers et de leurs dépendances peuvent changer. Il faut actualiser explicitement les pins et faire revoir le nouveau job avant compilation ou installation. Aucun ancien accord ne devient une approbation du job déplacé.

Le compilateur `3e1f8540…` et les artefacts immuables à huit options sont conservés comme versions historiques. Une évolution du compilateur partagé pendant la préparation est signalée dans la preuve de restitution. Ce premier export ne remplace pas l’archive ultérieure des nouveaux jobs, de leurs réglages ou des corrections de gameplay encore en cours.

La restitution réelle a vérifié 63 fichiers, 41 PNG et trois jobs représentatifs : Watersnake, Skull rétro et Urban Tiger. Les 19 contrôles de syntaxe sont passés. Ce contrôle préserve les données ; il ne certifie pas une nouvelle compilation, un nouveau gameplay, les autres modes ou une fidélité visuelle parfaite.
