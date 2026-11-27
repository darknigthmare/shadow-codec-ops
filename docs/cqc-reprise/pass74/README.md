# P74 — Contenu, gameplay et preuves de continuation

**27 novembre 2026 — MGS Codec Simulator / CQC Versus Legacy.**

Ce dossier réunit la continuation canonique et l’extension originale **VEILBREAK — La dette des soldats**. La [synthèse de continuation](../../cqc-bible/CONTINUATION_P74.md) explique les avancées, les limites et la suite du travail; la [bible complète](../../cqc-bible/VEILBREAK.md) conserve les dossiers de contenu.

## 1. Périmètre du lot

| Élément | Quantité / résultat |
| --- | --- |
| Combattants originaux jouables | 10 |
| Stages originaux | 20 |
| Archétypes ennemis | 20 |
| Boss originaux | 20 |
| Profils et commandes | 50 profils, 500 commandes |
| Campagne | 40 combats |
| Boss Rush | 20 boss |
| Équipe locale | 2v2, permutation et assistances |
| Texte narratif | 60 scènes, 10 dialogues de rivalité |
| Client | Hub et client de combat léger |
| Corpus canonique suivi | 286 candidats, 109 dossiers, 72 sans candidat |
| Images originales conservées | **99 PNG** |
| Images d’arsenal conservées | **29**, comprises dans les 99 |
| Absences d’images du lot original | **11** : un refus connu et dix résultats indisponibles |

Les dix combattants originaux sont jouables; les vingt ennemis et les vingt boss disposent de profils d’adversaires. Les 500 commandes sont des entrées de combat exécutables, pas 500 animations produites.

## 2. Source de données et accès au jeu

- [Catalogue VEILBREAK](../../../public/cqc/data/veilbreak-content.json) : identifiants, profils, ressources, scènes, campagne, phases et références d’assets.
- [Hub VEILBREAK](../../../public/cqc/originals/veilbreak/index.html).
- [Client de combat léger](../../../public/cqc/originals/veilbreak/battle.html).
- [Logique de progression](../../../public/cqc/originals/veilbreak/campaign.js).
- [Documentation du gameplay](gameplay/README.md).
- [Contrat du client VEILBREAK](gameplay/CLIENT_VEILBREAK.md).

Le client léger utilise les données et images de cette extension. VEILBREAK est une création originale non canonique; son contenu ne remplace pas les dossiers de référence officiels.

Les vingt ennemis sont des archétypes : leurs champs de nom civil et d’âge restent nuls. Les onze boss mécaniques n’ont pas d’identité humaine. Les neuf boss humains possèdent des identités originales distinctes; ce nettoyage éditorial ne change aucune mécanique.

## 3. Images : présence, provenance et absences

Le [manifeste d’images original](veilbreak/image-manifest.json) constitue la référence pour les chemins, catégories, prompts exacts, empreintes, octets, dimensions, résultats et absences.

| Catégorie | Cibles | Présentes à l’inventaire | Absentes |
| --- | ---: | ---: | ---: |
| Combattants | 10 | 10 | 0 |
| Stages | 20 | 20 | 0 |
| Ennemis | 20 | 20 | 0 |
| Boss | 20 | 20 | 0 |
| Props | 20 | 18 | 2 |
| Projectiles | 20 | 11 | 9 |
| **Total** | **110** | **99** | **11** |

### Qualification des onze absences

`vb_prop_floor_clamp` a reçu un refus de génération sans image retournée, requête `f284877c-a01f-41aa-b23c-f4a8b9992872`. Aucune relance n’a été faite. La fiche conserve `asset: null` et `generation_blocked_no_asset`; le concept et la définition de gameplay ne constituent pas une illustration livrée.

Les **dix autres résultats** du dernier lot sont indisponibles pour l’intégration. Leur cause n’est pas établie. Ils ne sont pas comptés comme fichiers livrés et ne doivent pas être requalifiés en refus ou en validation graphique.

### Rendu des galeries et portée de la revue

Les fichiers conservés ont passé les contrôles d’octets consignés dans le manifeste. Après restauration de l’environnement, les **six galeries ont été rendues avec les 99 images attendues**, sans image 404 ni erreur JavaScript dans le [rapport final du portail](veilbreak/evidence/portal-report.json). **Les six galeries ont également été examinées visuellement.** Les 99 PNG ont passé le décodage et le contrôle d’empreintes; les 79 images hors stages contiennent des pixels transparents. Le [rapport raster](veilbreak/image-raster-validation.json) et la [revue visuelle](veilbreak/visual-review.json) détaillent ces contrôles. Cette revue porte sur les bases et les composites livrés, sans certifier des animations terminées ni une fidélité canonique 1:1.

La revue des vingt ennemis et vingt boss montre des bases entières, des silhouettes et équipements principaux sans coupe observée, et une palette industrielle cohérente. Elle relève toutefois des silhouettes humaines proches, notamment patrouilleur, tireur et observateur, ainsi qu’une proximité entre CHOIR MARSHAL et PHASE CLERK. Les grandes machines sont normalisées pour la galerie : ce contrôle ne valide ni leur échelle fictionnelle, ni leurs collisions, ni un rig d’animation. Voir les [ennemis](veilbreak/evidence/gallery-enemies.png) et les [boss](veilbreak/evidence/gallery-bosses.png).

Les dix combattants sont visibles en entier et les vingt stages présentent des architectures distinctes, une palette cohérente et des sols de duel lisibles. Latch, Switchback et Rookglass partagent des choix de coiffure proches, mais leur prothèse, tenue ou poncho les distinguent. Les dix-huit props et onze projectiles sont entiers et présentent chacun un objet principal indépendant. La lisibilité de la fléchette fine à petite échelle reste à peaufiner; l’orientation de l’image du ballast a été corrigée dans le catalogue et son rendu.

Les images de combattants, ennemis et boss sont des **poses de base statiques**. Les vingt stages sont des **fonds composites**. Les cycles d’animation, pièces articulées et couches de parallaxe gardent leurs propres tâches de production.

Dans le combat, **62 commandes** possèdent une référence `asset_id`, couvrant **21 identifiants d’arsenal distincts**. **Treize disposent d’un PNG présent; huit utilisent encore une représentation procédurale dans le client.** Les vingt-neuf images d’arsenal conservées comprennent aussi des props de décor, de maintenance ou d’articulation; elles ne correspondent donc pas à vingt-neuf attaques illustrées. Une référence de catalogue ne prouve pas la présence de son image.

## 4. Bilan canonique

- [Delta de couverture](canonical/coverage-delta.json).
- [Lot examiné et qualification des candidats](canonical/reviewed-batch.json).
- [Dossier canonique](canonical/README.md).

Le bilan suit **286 candidats visuels**, **109 dossiers** et **72 dossiers sans candidat**. Ces mesures de couverture ne sont pas des certifications de fidélité. Les dossiers avec un candidat peuvent encore demander une comparaison, des corrections, des états supplémentaires et une intégration.

Aucun dossier n’est déclaré terminé en 1:1 par le seul ajout d’une image. L’extension originale conserve de son côté une qualification de cohérence à vérifier, sans être présentée comme du contenu officiel.

## 5. Index des preuves de gameplay

| Preuve | Résultat documenté | Périmètre |
| --- | --- | --- |
| [Validation du catalogue](../../cqc-bible/veilbreak-data-validation.json) | Profils, slots, ressources et références cohérents. | Contrôle de données; aucune approbation visuelle. |
| [Validation du moteur](../../cqc-bible/veilbreak-engine-validation.json) | 500/500 commandes, 50/50 paires déterministes, 104 516 états contrôlés. | Effets contextuels dans le moteur CQC réel. |
| [Script des 500 commandes](../../../scripts/test-cqc-veilbreak-content.mjs) | Script de reproduction du contrôle moteur. | Active chaque commande avec son contexte et sa ressource. |
| [Tests d’équipe](../../../scripts/test-cqc-p74-tag-team.mjs) | 16 tests Node réussis. | Équipe, permutations, assistances et replays de duel/équipe. |
| [Tests du contrôleur](../../../scripts/test-cqc-p74-veilbreak-controller.mjs) | 5 tests Node réussis. | Contraintes et phases des vingt boss. |
| [Tests de campagne](../../../scripts/test-cqc-veilbreak-campaign.mjs) | 7 tests Node réussis. | Progression, sauvegarde et états de campagne. |
| [Tests des résultats](../../../scripts/test-cqc-veilbreak-result-state.mjs) | 12 tests Node réussis. | Déduplication, reprises et transitions des résultats du portail. |
| [Rapport interface d’équipe](gameplay/evidence/team-ui-report.json) | 5 contrôles navigateur réussis. | Interface d’équipe. |
| [Rapport du client léger](gameplay/evidence/veilbreak-client/report.json) | 7 contrôles navigateur réussis. | Combat réel, interface et sortie contrôlée après une image 404 volontaire. |
| [Rapport final du portail](veilbreak/evidence/portal-report.json) | 11 contrôles navigateur réussis; six galeries, 99 images rendues. | Sélection, persistance, scènes, dossiers, lancements réels, fixtures de progression, retour intégré et mobile; zéro erreur JS ou ressource manquante. |
| [Script du portail](../../../scripts/test-cqc-veilbreak-portal.mjs) | Reproduction des contrôles finaux. | Portail et client léger; pas de parcours exhaustif du v055 historique. |

Captures de preuve : [équipe desktop](gameplay/evidence/team-ui-desktop.png), [équipe mobile](gameplay/evidence/team-ui-mobile.png), [combat desktop](gameplay/evidence/veilbreak-client/battle-desktop.png), [combat mobile](gameplay/evidence/veilbreak-client/battle-mobile.png), [portail desktop](veilbreak/evidence/portal-desktop.png), [portail mobile](veilbreak/evidence/portal-mobile.png).

Les six galeries : [combattants](veilbreak/evidence/gallery-fighters.png), [stages](veilbreak/evidence/gallery-stages.png), [ennemis](veilbreak/evidence/gallery-enemies.png), [boss](veilbreak/evidence/gallery-bosses.png), [props](veilbreak/evidence/gallery-props.png), [projectiles](veilbreak/evidence/gallery-projectiles.png).

Les suites totalisent **40 tests Node uniques : 16 équipe + 5 contrôleur + 7 campagne + 12 résultats**. Les ensembles « 33 gameplay » et « 19 campagne/résultats » partagent les douze tests de résultat; leur somme brute compterait ces cas deux fois. La [preuve V8 des résultats](veilbreak/evidence/portal-result-v8-report.json), produite pendant l’indisponibilité de l’exécuteur, reste séparée de leur réexécution Node.

Les **5 + 7 + 11 contrôles navigateur** et les 500 commandes du moteur possèdent des périmètres distincts. Les contrôles d’équipe et du client ont été réalisés sous Chromium 158, sans erreur JavaScript ni échec réseau inattendu; le 404 d’image y était intentionnel. La régression finale du portail après restauration ne relève aucune erreur JavaScript ni ressource manquante. Elle vérifie les premiers lancements réels et des fixtures de progression, sans prétendre avoir joué intégralement les quarante combats. **Le rendu historique v055 n’a pas été contrôlé exhaustivement**, et ces preuves ne certifient pas un déploiement ou l’équilibrage.

## 6. Ce qui reste ouvert dans la bible

- Animations propres aux cinquante profils : déplacement, garde, impacts, attaques, transitions, provocations et victoires.
- Cent plans de parallaxe séparés et assemblage des vingt stages.
- Pièces mobiles, câbles, chaînes, pivots, points faibles et origines de projectile des machines.
- Soixante illustrations narratives distinctes pour les introductions et épilogues.
- Trente neutralisations conçues mais encore à animer, mettre en scène et piloter.
- Vingt costumes alternatifs, en plus des dix tenues de service.
- VFX bitmap, sons et musique; dix clips VFX sont prévus dans le catalogue.
- Onze images d’arsenal absentes, avec leurs qualifications conservées.
- Soixante-douze dossiers canoniques sans candidat et examen des candidats existants.
- Règles supplémentaires du guide général et de ses extensions, selon leurs preuves propres.
- Contrôles d’échelle des grandes machines, revue des futurs états animés, recettes prolongées et équilibrage.

Le dossier de continuation décrit l’avancée de P74. La bible conserve les exigences et la production à terminer. **Aucune clôture globale 1:1, aucune validation d’animations encore absentes et aucun équilibrage certifié ne sont revendiqués.**

## 7. Reprise et intégrité

Lors d’une reprise, commencer par les manifestes et le catalogue de la branche de travail, puis rapprocher chaque chemin de sa preuve de présence. Préserver les statuts de candidat, les absences et le refus connu; une référence de fichier ou une entrée de catalogue ne prouve pas que ses octets ont été conservés.

Les rapports moteur identifient leur source et leur périmètre. Les modifications éditoriales et les admissions d’images ne doivent pas être présentées comme une nouvelle campagne de tests. Toute nouvelle modification mécanique doit être rapprochée de ces preuves et vérifiée selon son risque réel.
