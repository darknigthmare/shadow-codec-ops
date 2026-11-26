# P69 — intégration et vérification

## Résultat local

**8 PNG sélectionnés, 90 fiches Atlas, 267 sources cumulées.** Les [22 tests Node existants](p69-node-tests.txt) et le [contrôle d’intégrité P69](p69-local-verification.json) passent. Les huit sorties brutes totalisent **7 880 823 octets**. Neuf appels imagegen sont documentés : huit sorties sélectionnées et un refus sans PNG ; aucune nouvelle archive image.

La [revue visuelle racine](root-visual-review.json) retient les huit sources dans leur portée réelle. Le [lot de revue figé](reviewed-batch.json) fixe leurs identités, les douze fichiers de référence utilisés ou corroboratifs et les neuf prompts exacts. Les PNG n’ont subi aucun réencodage, recadrage ou retouche de pixels.

## Conservation de l’existant

La base publiée est le commit `764ba74e7650b3f744899636cfabc2683c960bfe`, arbre `7e83efa8e46a9800f988ee31050482c458fa29fe`. La [preuve de comparaison réelle des arbres Git](p68-baseline-proof.json) et les [empreintes de base](baseline-pins.json) lient les contrôles à cette version.

Les sept registres antérieurs restent identiques, avec leurs **259 sources sélectionnées et 20 archives**. Les **82 objets Atlas antérieurs** gardent leurs données et leur ordre. Les cinq documents partagés de la bible reçoivent une section P69 additive. Le contrôleur, le module, le style et la page d’entrée de l’Atlas restent identiques à la base publiée.

Les images historiques absentes du dossier local sont contrôlées par leurs identités dans les arbres Git publiés. Elles n’ont pas été téléchargées ni décodées à nouveau. Les fichiers historiques effectivement disponibles sont aussi hachés localement.

## PNG, références et associations

Pour chacune des huit images, le contrôle vérifie signature PNG, structure des chunks, CRC, décompression IDAT, filtres, dimensions réelles, couleur, alpha, taille, SHA-256 et SHA Git. Les fonds transparents possèdent un véritable canal alpha. Ces vérifications ne mesurent pas la fidélité géométrique au modèle de jeu.

Les douze références archivées sont vérifiées par taille et empreintes. Les prompts de génération et le prompt refusé sont figés séparément. Les huit fiches de bible, les identités d’assets, les rubriques du guide et les liens de l’Atlas concordent. Les filtres du contrôleur réel retrouvent les nouvelles fiches dans leur édition propre.

Les trois soldats AC!D 2 présentent un corps majoritairement à alpha253 et une faible frange documentée. L’Air Shock Cannon contient de petites marques RGB blanches d’alpha1–2 : le [diagnostic](research/survive/alpha-preview-diagnostic.json) les distingue des surfaces de l’objet. Le portrait R-00 garde un cadrage volontaire aux épaules. Ces limites sont conservées dans les fiches, sans modification des images brutes.

## Graphe runtime

| Mesure | P68 | P69 | Variation |
|---|---:|---:|---:|
| Fichiers | 3 095 | 3 103 | +8 |
| Références internes | 5 031 | 5 039 | +8 |
| Octets référencés | 3 579 063 446 | 3 586 969 781 | +7 906 335 |
| Références omises documentées | 740 | 740 | 0 |
| Routes externes documentées | 499 | 499 | 0 |

Seul le catalogue change parmi les anciens propriétaires runtime ; les huit PNG s’ajoutent. Les **3 094 autres lignes et 5 031 liens antérieurs** sont conservés. Les 3 103 lignes sont accessibles depuis l’entrée selon le graphe. Le manifeste est comparé à la proposition du scanner réel `discoverReferences`, via `extendP63RuntimeManifest`.

Les images sont accessibles comme sources documentaires de l’Atlas. `runtimeIntegrated`, `combatReady` et `combatRuntimeIntegrated` restent explicitement faux pour l’admission au combat ; `runtimeBinding.status` vaut `atlas_only`. Les refus et références de recherche ne sont pas ajoutés au graphe runtime.

## Fichiers locaux et revue indépendante

Les [six journaux P67/P68 retrouvés à côté du projet](local-addendum/README.md) sont conservés en copies exactes, **76 078 octets** au total. Leur [revue indépendante](research/rising/local-review.json) vérifie tailles et empreintes. Les 53 fichiers de récupération antérieurs restent intacts. L’[inventaire initial](initial-local-audit.json) constate que les treize variantes de fichiers canoniques étaient déjà archivées dans cette récupération ou l’addendum P68.

La [revue indépendante finale](research/rising/integration-review.json) réussit 128 contrôles de structure et d’identité sur les registres, l’Atlas, le runtime, les compteurs, les exclusions et les liens. Elle ne répète pas les tests Node.

Une revue indépendante des scripts a détecté un format de compteur différent dans le handoff Rising. Le handoff et son générateur ont été normalisés avant l’intégration. Le calcul de couverture historique compare les identités P61 : **76 → 75 lignes sans candidat**, grâce au portrait R-00 ; les statuts, corps manquants et groupes ouverts restent inchangés. Le [détail](coverage-delta.json) explique cette présence documentaire.

## Reproduction des contrôles

Dans un dépôt disposant de l’historique et des fichiers sélectionnés, les tests existants s’exécutent ainsi :

```bash
node --test scripts/test-cqc-p63-source-atlas.mjs scripts/test-cqc-p67-source-atlas.mjs
node scripts/check-cqc-p69.mjs .
```

Dans le dossier partiel utilisé pour cette passe, le contrôle reçoit `--baseline-dir` pointant vers les textes P68 aux empreintes vérifiées et `--git-repository` pointant vers les objets Git historiques. Le constructeur utilise les mêmes textes de base avec `python scripts/build-cqc-p69.py --baseline-dir /chemin/vers/base-p68`. Les données de revue et de plans doivent déjà être présentes ; le constructeur n’effectue aucune génération d’image.

## Limites et publication

Le moteur Chromium attendu à `/usr/lib/chromium/chromium` est absent. Aucun essai navigateur ou rendu interactif exécuté n’est revendiqué. Les tests Node couvrent notamment chargement, reprise après erreur, filtres, sélection et navigation avec leurs doubles de DOM ; ils ne constituent pas une validation de rendu navigateur.

La fidélité absolue 1:1, la résolution UHD native, l’animation et l’admission au combat ne sont pas certifiées. Les états de la bible décrivent du travail futur. La publication conserve la PR ouverte en brouillon ; aucune fusion n’est effectuée. Le [plan de publication](publication-plan.json) énumère les fichiers et empreintes prévus. La vérification distante de l’arbre et du head est réalisée après la mise à jour de la branche ; les statuts de déploiement sont rapportés séparément.
