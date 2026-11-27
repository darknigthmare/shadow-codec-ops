# P68 — intégration et limites de validation

## Résultat vérifié

**5 nouvelles sources sélectionnées, 1 essai archivé et 6 appels imagegen.** Le cumul atteint **259 sources sélectionnées**, **82 dossiers Atlas** et **20 archives**.

Base des assets : P67 `0a92d18aa7bb4068f0be0265bf01d884e3404e95`. Parent de publication prévu après récupération locale : `97b19718581154374ecb8bbb299540fd4c8b0322`. Le [contrat de revue indépendant](reviewed-batch.json) contient les identités des cinq sélections et de l’archive ; il reflète la revue du root, sans certification absolue de fidélité.

| Contrôle | État et portée |
|---|---|
| Sources/alpha | Six PNG bruts : CRC, décompression, dimensions, SHA-256/SHA Git et extrema alpha vérifiés. Le gate ne remesure pas les franges ; leurs diagnostics restent dans les sous-dossiers classic et survive. |
| Registres historiques | Six registres byte-identiques à P67 ; identités Git des 254 sources et 19 archives antérieures rapprochées du véritable arbre publié. Les PNG historiques absents localement ne sont pas annoncés comme redécodés. |
| Atlas | Préfixe exact et ordonné des 77 anciens objets vérifié ; cinq fiches ajoutées, soit 82. Les anciennes données normalisées sont conservées. |
| Runtime | Scanner réel `extendP63RuntimeManifest` exécuté : 3095 lignes, 5031 références, 3579063446 octets. |
| Propriétaires runtime | Seul le catalogue est changé ; cinq PNG ajoutés. Interface, contrôleur et shell conservés. |
| Tests Node | **22 / 22 passés**, zéro échec ou test ignoré ; [sortie réelle](p68-node-tests.txt). |
| Gate P68 | **Passé** : six PNG, six prompts, cinq ancres de bible, trois références natives avec identité Git P67 et exclusion de l’archive du runtime ; [rapport complet](p68-local-verification.json). |
| Graphe et conservation | 3 089 anciennes lignes non modifiées, 5 026 liens préservés, 740 omissions et 499 routes externes conservées ; égalité avec la proposition du scanner réel. |
| Récupération locale | Les 53 fichiers de l’archive sont vérifiés avec leurs empreintes ; la preuve de publication distante demeure un rapport séparé. |
| Navigateur | Non exécuté après la réinitialisation : binaire Chromium et cache absents. |
| Combat/déploiement | Aucune admission au combat ni validation de déploiement par cette passe. |

## Reproduction

Construire depuis les huit snapshots P67 authentifiés par leurs SHA Git :

```sh
python scripts/build-cqc-p68.py --baseline-dir /chemin/p67-integration-baseline --pins /chemin/p67-baseline-pins.json
node --test scripts/test-cqc-p63-source-atlas.mjs scripts/test-cqc-p67-source-atlas.mjs
node scripts/check-cqc-p68.mjs /chemin/du/projet --baseline-dir /chemin/p67-integration-baseline --git-repository /chemin/du/clone-reel
```

Le vérificateur a comparé l’extension au véritable arbre Git P67 ; les métadonnées de fichiers historiques absents localement sont rapprochées de leurs blobs publiés sans téléchargement de toute la collection. Aucun résultat de navigateur, de combat ou de certification 1:1 n’est déduit des contrôles de PNG et de graphe.

## Version Survive et reprise

Balloon Trap V1 est retenu après diagnostic alpha ; V2 est archivé. Les couleurs RGB de pixels alpha nul ne constituent pas un halo visible avec une composition alpha correcte. Les faibles franges restent documentées, sans nettoyage des pixels. Les [53 fichiers récupérés](../local-recovery-20261126/README.md) ont leur [preuve de publication séparée](recovery-publication-verification.json).

La réinitialisation a supprimé le dossier temporaire d’origine. Les PNG bruts, les blobs déjà créés et les références publiées ont permis une récupération vérifiée ; les chemins d’origine restent des informations de provenance. Les fiches conservent toutes les limites de pose, de cadrage, de géométrie et de référence.
