Cette archive conserve 97 fichiers de travail récents : jobs, livres de poses, mesures, calibrations, compilateur, code proposé et preuves de revue. Elle conserve des travaux validés, proposés et encore en attente. Elle ne déclare aucun personnage, costume ou mode supplémentaire terminé. Les sept métadonnées du lot de sauvegarde source09 et les PNG natifs déjà archivés ne sont pas dupliqués.

Les quatre marqueurs `@PROJECT_ROOT@`, `@APP_ROOT@`, `@WORKSPACE_ROOT@` et `@SCRATCH_ROOT@` remplacent uniquement les anciens préfixes de chemins. Leurs inverses restituent exactement les textes décodés, tous les nombres, pivots, clips, hauteurs, SHA et points d’émission. Les anciens octets des conteneurs gzip ne sont pas reproduits.

Avec Python 3.9 ou supérieur, depuis cette archive :

```sh
python hydrate-editing-export.py . NOUVEAU_DOSSIER --manifest-sha256 4e8fb1cf32fe3ae193b899c71b9172f06b04ca8217f353a4135a133fd94b603d
```

L’hydrateur vérifie tous les fichiers avant écriture, refuse une destination existante et n’exécute aucun code restauré. Les options `--app-root`, `--workspace-root` et `--scratch-root` choisissent les autres racines. Sans ces options, des sous-dossiers explicites du nouveau dossier sont utilisés.

Le manifeste `EDITING_NATIVE_SOURCE_BINDINGS.json` référence 31 PNG déjà sauvegardés dans les commits publics. Après récupération de leurs octets vérifiés avec l’arborescence indiquée, ajouter :

```sh
--native-source-directory DOSSIER_DES_SOURCES --native-bindings-sha256 315de23daff038e86ff5c90be216abaf63907da11bae741719d975c1ebd05ec9
```

Le sous-dossier `docs/cqc-reprise/pass40/recovery-20261022` d’une copie du dépôt au commit indiqué contient ces sources. Aucune image n’est modifiée ou admise à nouveau. La vérification locale a matérialisé et vérifié 97 fichiers d’édition et 31 PNG ; 23 contrôles syntaxiques sont passés. Aucun compilateur ni job restauré n’a été exécuté.

Les métadonnées, anciens hôtes et autres dépendances absentes doivent être récupérés séparément. Le rapport local distingue les dépendances concordantes, absentes et les empreintes à revoir. Il ne devine aucune dépendance.

Les revues Root incluses restent des preuves historiques liées à leurs octets d’origine. Les jobs normalisés ou modifiés nécessitent des pins actualisés et une nouvelle revue. Aucun accord ancien n’est transféré. Le compilateur `1a1aa773…` et son garde de calibration sont conservés avec leur revue ; les variantes Core, corrections de rafales et autres propositions restent soumises à l’intégration et aux essais réels avant activation.

Ce contrôle préserve les fichiers et réglages. Il ne certifie ni une compilation complète, ni le gameplay de tous les modes, ni une fidélité visuelle parfaite.
