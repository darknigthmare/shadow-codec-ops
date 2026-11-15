# Référence, méthode et sens des compteurs

## Version réellement auditée

Cet audit prend pour référence **P41**, commit [`ba4e30a09e9e95727b75a665e7b6ab07d9941aea`](https://github.com/darknigthmare/shadow-codec-ops/commit/ba4e30a09e9e95727b75a665e7b6ab07d9941aea), sur `codex/cqc-p40-batch30-recovery`, tête de la [PR nº 3](https://github.com/darknigthmare/shadow-codec-ops/pull/3) observée le **23 octobre 2026**. La branche `main` observée pointe encore sur le commit `9a37e0ca975021df2eb6db7fd28fe4dcd9a2550c` du 5 septembre 2026 : elle aurait donné un audit périmé. Les libellés internes `0.53`, `0.55`, `0.56` et `3.10.0` n'identifient pas à eux seuls le contenu des passes P39–P41.

La PR de cet audit est une **PR de documentation empilée sur cette branche récente**. Elle ajoute l'inventaire, les spécifications et les outils de contrôle. Elle ne prétend pas que les contenus décrits ont été implémentés. Les branches historiques, les originaux et le runtime sont conservés.

Le statut de déploiement public est indépendant du statut Git : le document de livraison P41 distingue lui-même les vérifications locales et la validation du déploiement. Cet audit porte sur le code de la PR, sans prétendre que le site public exécutait déjà exactement ce SHA. Source : [notes P41](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/docs/cqc-reprise/pass41/batch30-20261023/RELEASE_NOTES_FR_20261023.md).

## Mesures reproductibles

Les chiffres ci-dessous proviennent du chargement des scripts de `unified-versus-v055.html` **dans leur ordre réel**, après leurs extensions P19 à P41. Une simple recherche du tableau initial `FIGHTERS` aurait donné seulement 354 profils et aurait oublié 26 ajouts.

Pour cette capture de données, Chromium a utilisé un contexte neuf, un serveur local et une image d'un pixel en remplacement des images lourdes. Les accès externes étaient bloqués. C'est une **vérification des registres, de leurs raccordements et de leur exécution**, sans examen visuel de tous les PNG et sans campagne de combats. Les états de chargement `missing`, `dormant` ou `queued` rencontrés dans cette sonde ne sont donc pas des preuves de ressources cassées.

| Mesure | Valeur observée | Interprétation correcte |
|---|---:|---|
| Profils du Versus | 380 | UID distincts : des incarnations, des unités, des équipements adaptés et des créations historiques peuvent représenter plus d'une version d'une même personne. |
| Techniques | 3 800 | Dix fiches de combat par profil ; pas 3 800 séquences dessinées uniques. |
| Fiches de finishers | 1 520 | Quatre par profil ; leur mise en scène utilise aussi des familles et des poses communes. |
| Profils avec corps dans le renderer standard | 356 | Catalogue d'actions et de régions d'image disponible. La qualité artistique et la richesse des transitions restent à qualifier. |
| Profils routés vers les machines | 24 | Un autre chemin de rendu existe ; leur absence du catalogue humain n'est pas un sprite manquant. |
| Profils sans l'une de ces deux routes | 0 | Couverture de raccordement, sans certification de fidélité visuelle. |
| Stages du registre partagé Versus | 124 | Définitions admises ; les scènes spécialisées hors registre sont distinguées dans le chapitre 03. |
| Alias de stages | 123 | Noms/raccords ; ne pas ajouter 123 arènes aux 124. |
| Rigs de machines | 64 | Définitions techniques pouvant inclure faces, variantes et accessoires ; pas 64 boss uniques. |
| Descripteurs du vestiaire différé | 191 | Sous-ensemble des options ; voir l'union dédupliquée du chapitre 02. |
| Histoires existantes | 354 | Avec trois scènes d'introduction et trois d'épilogue par histoire. |
| Profils actifs sans histoire | 26 | Différence d'identifiants réellement calculée, détaillée au chapitre 05. |
| Scènes narratives existantes | 2 124 | 1 062 scènes d'introduction et 1 062 d'épilogue. |
| Scènes déclarées comme illustrations entières | 486 | Métadonnée `fullScene`, pas nouvelle validation de chaque image. |
| Scènes composées à compléter | 1 638 | Décor/portrait/composition partagés. |
| Histoires avec six illustrations entières déclarées | 81 | Les 273 autres histoires restent en composition pour leurs six scènes. |
| Histoires partageant une même clé d'image entre intro et épilogue | 0 | Le mapping est distinct. Une comparaison visuelle des images reste une autre vérification. |
| Fichiers du manifeste runtime | 2 736 | Tous les chemins déclarés existent dans l'arbre Git audité. |
| Taille cumulée déclarée | 3 187 473 639 octets | Environ 3,19 Go décimaux ; ce n'est pas le téléchargement initial d'une partie. |
| Routes externes immuables explicites | 96 | Raccords supplémentaires à des chemins Git épinglés. |
| Fichiers audio dans ce manifeste | 0 | N'exclut pas les sons synthétisés par le code. |

Les mesures, les empreintes des fichiers sources et les définitions de périmètre sont dans [data/etat_mesure.json](data/etat_mesure.json). Les lectures n'ont produit aucune exception JavaScript de page dans cette configuration. Cela ne remplace pas la recette des combats, des costumes, des images et des appareils réels.

## Comment reconnaître un manque

| État | Ce qu'il signifie | Ce qu'il ne permet pas d'affirmer |
|---|---|---|
| Présent dans le registre | L'identité ou l'option est raccordée au moteur courant. | Que tous les dessins et timings reproduisent l'original. |
| Présent, partiel | Une base utilisable existe ; les éléments à compléter sont nommés. | Que tout le personnage ou le stage doit être refait. |
| Absent du périmètre inspecté | Aucun raccord correspondant n'a été identifié dans les registres concernés. | Qu'aucun ancien fichier ou candidat ne subsiste dans une archive. |
| Référence à confirmer | Le nom, l'édition, l'accessoire ou la source ne permet pas encore de décider. | Que la proposition est un costume officiel. |
| Proposition CQC | Création demandée ou nouvelle proposition cohérente avec une famille existante. | Qu'elle apparaît dans un jeu commercial. |
| Option bonus | Contenu officiel secondaire ou crossover explicitement séparé. | Qu'il doit bloquer la finition du cœur du jeu. |
| Vérification nécessaire | La présence est attestée, mais une preuve artistique ou de gameplay manque à cet audit. | Qu'un bogue a été reproduit. |

Les listes historiques `pending-art` ne sont pas reprises aveuglément : P40 et P41 ont ajouté des costumes sans réécrire toutes les anciennes files. Inversement, un portrait, un fichier de référence, une fiche de dossier ou une image rejetée ne clôture pas la production d'un combattant.

## Contrat de fidélité 1:1

La demande 1:1 devient un cahier de réception vérifiable. Pour chaque élément officiel, le dossier de production doit conserver : **jeu, édition, plateforme, période/personnage, source et moment de référence, vues nécessaires, différences autorisées et captures finales**. Un costume débloqué dans un remake n'est pas automatiquement porté par toutes les incarnations antérieures.

1. **Identité et époque.** Même personne, âge, blessures, bras/œil, coiffure, équipements et insignes. Distinguer Naked Snake, Big Boss, Venom et Solid ; Raiden MGS2, MGS4, R-00 et corps ultérieur ; Gekko MGS4/MGR ; Blade Wolf/Fenrir.
2. **Silhouette et costume.** Proportions, découpe, matières, motifs, attaches, poches, armes et accessoires identifiables. Une simple teinte n'est pas une tenue entière. Les surfaces cachées restent à documenter, au lieu d'être déclarées exactes par hypothèse.
3. **Mouvement.** Décomposer les gestes de la source en poses et contacts. Les timings d'équilibrage d'un jeu de combat CQC sont des adaptations, tant qu'aucune mesure du jeu d'origine ne les établit comme identiques.
4. **Gauche/droite.** Préserver les asymétries anatomiques, l'œil, le bras artificiel, le port d'arme, le fourreau et les accessoires. Le registre actuel prévoit des directions distinctes ; ne pas les remplacer par un miroir automatique.
5. **Stage et machine.** Référence de la bonne édition, géométrie et composition reconnaissables, éléments mobiles identifiés, ordre des plans, échelle justifiée. Un hangar de même ambiance ne clôture pas le besoin d'une salle précise.
6. **Canon et fiction.** Le personnage et ses caractéristiques peuvent être officiels alors que ses dix techniques, son tournoi, ses finishers et son épilogue sont adaptés. Les Gala, cyborgs originaux, versions Dité et machines personnalisées restent étiquetés créations CQC.

Les références primaires sont prioritaires : manuels, pages et vidéos Konami, jeu commercial observé, illustrations officielles. Une page officielle prouvant l'existence d'une tenue ne documente pas à elle seule sa couture dorsale, ses images intermédiaires ou son éclairage. Les sources secondaires sont identifiées dans les chapitres thématiques et servent de pistes à confronter aux captures.

Le terme historique **« Turtle Armor » reste une référence non résolue**. Aucune assimilation automatique à Power Armor, Battle Dress ou une autre tenue ne doit entrer dans la production officielle. Le chapeau crocodile de MGS3, les combinaisons crocodile de Delta et les créations CQC sont également des objets distincts.

## Ce que l'audit conserve explicitement

- Les 24 ajouts de costumes P41, les costumes DLC Raiden et les réalisations P40 ; ils ne sont pas remis dans une liste de créations absentes.
- Les corrections d'identité apportées aux entrées historiques par les catalogues de présentation. Une ancienne étiquette incohérente doit être relevée avec son correctif actif, pas annoncée comme un bogue encore visible sans vérification.
- Les 354 histoires existantes et leurs clés d'image d'ouverture/conclusion distinctes.
- Les représentations natives et les rigs déjà raccordés ; le travail porte sur les écarts et les actions précisément décrites.
- Les variantes originales déjà commencées, leurs critères propres et leurs sources conservées. L'inventaire du vestiaire ne transforme pas toutes ces créations en costumes officiels.

## Reproduire les mesures

Depuis la racine du dépôt, avec Node et Playwright/Chromium déjà disponibles :

```bash
node docs/audit-cqc-2026-10-23/scripts/capture-runtime.mjs /tmp/cqc-audit-capture
python docs/audit-cqc-2026-10-23/scripts/build-inventory.py /tmp/cqc-audit-capture
```

`CQC_PLAYWRIGHT_MODULE` peut désigner le module Playwright installé et `CQC_CHROMIUM_EXECUTABLE` son navigateur. Le serveur est local à `127.0.0.1`. Le répertoire de sortie contient une capture de travail détaillée ; seuls les résultats utiles sont versionnés dans l'audit. Pour comparer une autre version, produire une nouvelle capture et actualiser explicitement le commit de référence, sans écraser le sens des mesures de P41.

La validation finale de cette PR vérifie les décomptes, les UID, les liens internes, la complétude des tableaux et l'absence de modifications du runtime. Elle ne relance pas un build graphique complet pour des changements de documentation.
