# Vérifications et reproduction de l’audit

**Référence : P41, `ba4e30a09e9e95727b75a665e7b6ab07d9941aea`, 23 octobre 2026.** Le dossier est une livraison de documentation et de données. Les scripts de reproduction écrivent uniquement leurs captures temporaires ou les résultats de ce dossier ; ils ne modifient pas le runtime du jeu.

## Résultats contrôlés

Le contrôle global final passe **145 vérifications sans échec**. Il conserve **un avertissement explicite** pour une référence Git historique, décrit plus bas. Les 18 résultats calculés de la synthèse Excel sont également rapprochés de leurs tables sources.

| Contrôle | Résultat et portée |
|---|---|
| Version source | Tête de la branche `codex/cqc-p40-batch30-recovery` et de la PR #3 vérifiée sur le SHA P41 avant publication. |
| Capture réelle des registres | Scripts exécutés dans Chromium dans l’ordre HTML, environnement local neuf, images remplacées et réseau externe bloqué. Aucune exception JavaScript de page. |
| Identité du runtime | Arbre `public/cqc` : `24b419e3a898f75e9a7f4603a89832799dd04b4c`. Le reproducteur refuse un runtime différent de P41. |
| Profils | 380 UID uniques, mêmes ensembles dans roster, animations et rapprochement des histoires. |
| Techniques | 3 800 fiches, dix commandes distinctes pour chacun des 380 profils. |
| Finishers | 1 520 fiches, quatre par profil ; rapprochement des tonalités et signalement du compteur hérité périmé. |
| Variantes | 597 couples acteur/tenue uniques, dont 380 Original et 217 alternatives, rapprochés du catalogue de costumes. |
| Stages et machines | 124 stages existants, 113 lots complémentaires, 64 rigs, 33 dossiers Arsenal, 54 lots machines et cinq modules spécialisés ; identifiants et relations contrôlés. |
| Catalogues | 87 tâches de roster, 315 références de costumes, 20 concepts originaux et 42 lots globaux. Les types de lignes ne sont pas confondus avec un compte de contenus absents. |
| Narration | 354 histoires, 26 profils sans histoire, 2 124 scènes ; 486 peintures déclarées et 1 638 compositions. Aucune même clé d’image entre intro et épilogue dans une histoire. |
| CSV / JSON | Lecture UTF-8, cardinalités, identifiants, relations et égalité des données lorsque les exports sont équivalents ; projections intentionnelles des animations prises en compte. |
| Liens du dossier | Liens relatifs, fichiers cibles et fragments d’ancre vérifiés automatiquement. Les nombres exacts figurent dans le rapport JSON final. |
| Sources de code P41 | Chemins épinglés et chemins de code cités retrouvés dans l’arbre Git. Le contrôle lit l’arbre, pas tous les blobs images. |
| Manifeste | Les 2 736 chemins de ressources déclarés existent dans l’arbre Git audité. Les octets de chaque ressource graphique n’ont pas tous été téléchargés ni revérifiés. |
| Classeur | 21 onglets, 14 529 lignes de consultation, 20 tables filtrables, synthèse calculée avec 18 formules dont les valeurs correspondent aux données. |
| Mise en page du classeur | 24 aperçus bornés générés ; ouverture de chaque onglet contrôlée, plus des vues de descriptions longues de techniques, finishers et stages. Lisibilité, titres, colonnes, retours à la ligne et hauteurs revus. |
| Fichier Excel | Archive ZIP/XML lisible, onglets présents, aucune cellule d’erreur Excel enregistrée. Le fichier est exporté avec `@oai/artifact-tool`. |
| Portée de la PR | Uniquement `docs/audit-cqc-2026-10-23/` ; aucun changement de gameplay, sprite, stage, sauvegarde ou configuration de déploiement. |

Rapports : [validation globale](data/validation_audit.json), [validation des animations](data/animation_validation.json), [validation du classeur](data/workbook_validation.json), [reçu de capture](data/capture_receipt.json), [mesures et empreintes](data/etat_mesure.json).

## Limites identifiées

La capture de registre est volontairement distincte d’une recette visuelle et d’une séance de jeu. Les images de remplacement permettent de charger les déclarations sans rapatrier les gigaoctets de ressources. Les états `missing`, dimensions de substitution ou erreurs d’asset imputables à cette capture ne sont pas classés comme défauts du jeu.

L’audit ne certifie pas la fidélité artistique 1:1, le rendu alpha, chaque costume à chaque pose, les collisions de chaque duel, la performance, l’audio ou les appareils réels. Il conserve les qualifications héritées et fournit les contrats détaillés nécessaires pour réaliser ces vérifications. Une fiche de production proposée ne prétend pas être une animation officielle extraite d’un jeu Konami.

Une provenance héritée cite le commit historique `d652251fdf85bfae69ec48d393564487cd3809ec`. Ce lien est conservé comme historique, mais son existence n’a pas été recontrôlée dans cette session. Le validateur le signale explicitement ; il ne le remplace pas par une fausse preuve P41. Les liens web des bibliographies ne font pas l’objet d’un test de disponibilité automatisé exhaustif.

Le build de l’application et les tests de gameplay n’ont pas été relancés pour cette PR exclusivement documentaire. Les validations de gameplay rapportées dans des notes de version précédentes restent celles de leurs auteurs et de leur date.

## Reproduire les contrôles de données

Depuis la racine du dépôt, Python 3 suffit pour valider les fichiers livrés :

```bash
python docs/audit-cqc-2026-10-23/scripts/validate-audit.py --require-deliverables
```

Pour contrôler sans réécrire le rapport :

```bash
python docs/audit-cqc-2026-10-23/scripts/validate-audit.py --no-write --require-deliverables
```

## Reprendre la capture P41

Pré-requis : Node, Playwright et Chromium disponibles. L’arbre `public/cqc` doit correspondre à P41 ; une PR ne modifiant que la documentation est compatible. Le script refuse une autre version afin de ne pas mélanger les mesures avec un commit de référence périmé.

```bash
node docs/audit-cqc-2026-10-23/scripts/capture-runtime.mjs /tmp/cqc-audit-capture
python docs/audit-cqc-2026-10-23/scripts/build-inventory.py /tmp/cqc-audit-capture
```

`CQC_PLAYWRIGHT_MODULE` peut désigner un module Playwright installé et `CQC_CHROMIUM_EXECUTABLE` le binaire Chromium. Le serveur se lie uniquement à `127.0.0.1`, puis se ferme avec le navigateur. Les captures temporaires contiennent les données détaillées nécessaires aux rapprochements.

Les fiches d’animation se régénèrent ainsi sur la même capture :

```bash
node docs/audit-cqc-2026-10-23/scripts/extract-animation-catalog.cjs /tmp/cqc-animation-catalog.json
python docs/audit-cqc-2026-10-23/scripts/build-animation-audit.py \
  --runtime /tmp/cqc-audit-capture/runtime-detailed.json \
  --detailed /tmp/cqc-audit-capture/runtime-detailed.json \
  --catalog /tmp/cqc-animation-catalog.json \
  --resolved /tmp/cqc-audit-capture/sprite-routing.json
```

Le snapshot détaillé contient à la fois les combattants/finishers et la garde-robe : il peut donc alimenter les deux paramètres. [Mode d’emploi du lot animations](scripts/README_ANIMATIONS.md).

## Régénérer le classeur

Les catalogues éditoriaux sont conservés dans les CSV/JSON du dossier. Le classeur lit ces fichiers ; il ne recherche ni ne crée de sprites. Pré-requis : Node avec `@oai/artifact-tool` disponible et Python 3.

```bash
python docs/audit-cqc-2026-10-23/scripts/build-priorities.py
python docs/audit-cqc-2026-10-23/scripts/prepare-workbook.py /tmp/cqc-workbook-input.json
node docs/audit-cqc-2026-10-23/scripts/build-workbook.mjs /tmp/cqc-workbook-input.json
python docs/audit-cqc-2026-10-23/scripts/validate-audit.py --require-deliverables
```

Le script accepte aussi un deuxième argument pour le chemin de sortie XLSX et un troisième pour les aperçus. `CQC_ARTIFACT_MODULE` peut désigner le module installé ; l’environnement runtime peut également fournir `CODEX_PRIMARY_RUNTIME_NODE_MODULES`. Les aperçus sont des fichiers de travail, tandis que le classeur livré et son rapport de contrôle sont dans le dossier d’audit.

Les seules données finales à modifier lors d’une prochaine production sont celles explicitement concernées. Un nouveau runtime exige une nouvelle référence et un rapprochement complet ; ces outils n’autorisent pas à conserver le label P41 sur une autre version.
