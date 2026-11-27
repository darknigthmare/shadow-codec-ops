# P68 — quatre silhouettes natives MSX2 / NES

Quatre PNG individuels ont été générés avec `image_gen.imagegen`, à partir de deux planches de sprites natifs déjà archivées en P67 : chien MSX2, chien NES, garde au jetpack NES et garde rouge MSX2.

Chaque fichier conserve les octets bruts de la sortie. Les poses, palettes et silhouettes visent la fidélité aux éditions indiquées ; les blocs de pixels agrandis restent des reconstructions génératives, sans certification de copie pixel exacte. Il ne s’agit pas de sprites animés admis au combat.

## Vérification

Les quatre images ont été décodées et leurs CRC vérifiés. Elles possèdent un canal alpha natif et des marges autour de la silhouette. Les planches de contrôle sur fonds clair et sombre ont été inspectées ; ces JPEG sont des dérivés de QA et ne remplacent pas les PNG sélectionnés. Les légers pixels alpha périphériques des sorties brutes sont conservés.

## Traçabilité et reprise

Le plan et les prompts complets figurent dans `generation-plan.json` et les fichiers `prompt-*.txt`. `handoff.json` contient les tailles, dimensions, empreintes SHA-256/Git, éditions, références, limites et points d’intégration. `reference-copies.json` décrit les copies exactes des références P67.

Une interruption de l’exécuteur a supprimé le premier dossier temporaire. Les images déjà produites ont été préservées par leurs résultats bruts et trois blobs GitHub, sans modifier de branche. Le dossier présent reconstitue les quatre PNG et leurs métadonnées. Le garde rouge a été produit depuis la planche MSX2 encore visible dans la conversation ; le routage exact des cinq images est inscrit dans son prompt.

Les registres centraux, l’Atlas et les rapports P67 n’ont pas été modifiés par cette sous-tâche. Le rattachement final est laissé au responsable de l’intégration P68.
