# Continuation P74 — CQC Versus Legacy et VEILBREAK

**Date : 27 novembre 2026.** Cette passe poursuit deux chantiers : les manques du corpus Metal Gear et l’extension originale **VEILBREAK — La dette des soldats**. Elle ajoute des définitions de combat exécutables et un client de jeu léger, puis conserve les limites de production dans la bible et les manifestes.

La [bible VEILBREAK](VEILBREAK.md) décrit le contenu. Le [catalogue JSON](../../public/cqc/data/veilbreak-content.json) porte les identifiants, profils, scènes, rencontres et références d’assets. Le [dossier de preuves P74](../cqc-reprise/pass74/README.md) précise ce qui a été vérifié.

## 1. Contenu et gameplay de la passe

| Domaine | État P74 | Portée de ce constat |
| --- | --- | --- |
| Combattants originaux jouables | 10 | Dossiers, silhouettes, ressources, passifs et dix commandes chacun. |
| Ennemis originaux | 20 archétypes | Profils de combat et adversaires de campagne; pas de nom civil ou d’âge arbitraire. |
| Boss originaux | 20 | Profils spécialisés, ouvertures et trois phases définies par seuils de vie. |
| Stages originaux | 20 | Arènes distinctes, objectifs narratifs et fonds composites. |
| Commandes de combat | 500 | Cinquante profils à dix slots, exercés dans le moteur CQC réel. |
| Campagne | 40 combats | Un ennemi puis un boss dans chacun des vingt stages. |
| Boss Rush | 20 confrontations | Parcours des vingt boss de l’extension. |
| Équipes locales | 2 contre 2 | Deux membres par camp, permutation et assistances dans le moteur d’équipe. |
| Histoire des dix combattants | 60 scènes écrites | Trois introductions et trois épilogues distincts par personnage; illustrations dédiées encore à produire. |
| Rivalités | 10 dialogues | Contenu narratif distinct des rencontres de campagne. |
| Client léger | Hub et client de combat | Chargement du catalogue VEILBREAK et de ses PNG directs, sans charger toute l’archive historique pour ce parcours. |

Accès : [hub VEILBREAK](../../public/cqc/originals/veilbreak/index.html), [client de combat](../../public/cqc/originals/veilbreak/battle.html), [progression de campagne](../../public/cqc/originals/veilbreak/campaign.js).

VEILBREAK reste du contenu **original non canonique**, situé par choix d’écriture en 2016. Les dix combattants jouables sont Latch, Breakwater, Switchback, Pale Current, Blind Ledger, Redline, Stillwell, Rookglass, Lockstep et Morrow-6. Leurs ajouts ne remplacent pas les dossiers du corpus officiel.

## 2. Inventaire graphique confirmé : 99 PNG

Le recomptage final conservé pour P74 donne **99 images originales**, dont **29 images d’arsenal**. Le [manifeste d’images](../cqc-reprise/pass74/veilbreak/image-manifest.json) fait foi pour les chemins, résultats de génération, empreintes, octets, dimensions et absences.

| Catégorie | Cibles du lot | PNG conservés | Absences |
| --- | ---: | ---: | ---: |
| Combattants | 10 | 10 | 0 |
| Stages | 20 | 20 | 0 |
| Ennemis | 20 | 20 | 0 |
| Boss | 20 | 20 | 0 |
| Props et pièces | 20 | 18 | 2 |
| Projectiles | 20 | 11 | 9 |
| **Total** | **110** | **99** | **11** |

Les onze absences ont deux qualifications :

- **Un refus connu** : `vb_prop_floor_clamp`, requête `f284877c-a01f-41aa-b23c-f4a8b9992872`. Le fournisseur n’a retourné aucune image. Aucune relance n’a été effectuée. Sa fiche conserve `asset: null` et `artStatus: "generation_blocked_no_asset"`.
- **Dix résultats indisponibles pour l’intégration** dans le dernier lot. Ils ne sont ni comptés comme images livrées ni requalifiés en refus. Aucune cause supplémentaire n’est établie.

Les fichiers conservés ont été contrôlés au niveau des octets et de leur inscription dans l’inventaire. Après restauration de l’environnement, les **six galeries ont été rendues avec les 99 images attendues**, sans image 404 ni erreur JavaScript dans le [contrôle final du portail](../cqc-reprise/pass74/veilbreak/evidence/portal-report.json). **Les six galeries ont également été examinées visuellement.** Les 99 PNG ont passé le décodage et le contrôle d’empreintes; les 79 images hors stages contiennent des pixels transparents. Le [rapport raster](../cqc-reprise/pass74/veilbreak/image-raster-validation.json) et la [revue visuelle](../cqc-reprise/pass74/veilbreak/visual-review.json) détaillent ces contrôles. Ce constat porte sur les bases et les composites livrés, sans certifier des animations terminées ni une fidélité canonique 1:1.

La revue des vingt ennemis et vingt boss montre des bases entières, des silhouettes et équipements principaux sans coupe observée, et une palette industrielle cohérente. Elle relève toutefois des silhouettes humaines proches, notamment patrouilleur, tireur et observateur, ainsi qu’une proximité entre CHOIR MARSHAL et PHASE CLERK. Les grandes machines sont normalisées pour la galerie : ce contrôle ne valide ni leur échelle fictionnelle, ni leurs collisions, ni un rig d’animation. Voir les [ennemis](../cqc-reprise/pass74/veilbreak/evidence/gallery-enemies.png) et les [boss](../cqc-reprise/pass74/veilbreak/evidence/gallery-bosses.png).

Les dix combattants sont visibles en entier et les vingt stages présentent des architectures distinctes, une palette cohérente et des sols de duel lisibles. Latch, Switchback et Rookglass partagent des choix de coiffure proches, mais leur prothèse, tenue ou poncho les distinguent. Les dix-huit props et onze projectiles sont entiers et présentent chacun un objet principal indépendant. La lisibilité de la fléchette fine à petite échelle reste à peaufiner; l’orientation de l’image du ballast a été corrigée dans le catalogue et son rendu.

Les 99 PNG comprennent des **poses de base statiques**, des **fonds composites** et des objets indépendants. Une pose ne remplace pas un jeu d’animations, et un fond composite ne remplace pas ses couches de parallaxe.

Dans le combat, **62 commandes** possèdent une référence `asset_id`, couvrant **21 identifiants d’arsenal distincts**. **Treize disposent d’un PNG présent; huit utilisent encore une représentation procédurale dans le client.** Les vingt-neuf images d’arsenal conservées comprennent aussi des props de décor, de maintenance ou d’articulation; elles ne correspondent donc pas à vingt-neuf attaques illustrées. Une référence de catalogue ne prouve pas la présence de son image.

## 3. Poursuite du corpus canonique

Le bilan canonique de P74 suit **286 candidats visuels**, **109 dossiers** et **72 dossiers sans candidat**. Les références exactes et leur qualification sont consignées dans le [delta de couverture](../cqc-reprise/pass74/canonical/coverage-delta.json), le [lot examiné](../cqc-reprise/pass74/canonical/reviewed-batch.json) et son [README](../cqc-reprise/pass74/canonical/README.md).

Ces nombres décrivent la couverture documentaire et les candidats disponibles. Ils ne signifient pas que 286 visuels sont approuvés, que les 109 dossiers sont clos ou que les 72 absences résument tous les travaux d’animation et d’intégration encore ouverts. Une image ajoutée à un dossier conserve son statut de candidat jusqu’à sa comparaison et à son admission.

La demande de fidélité 1:1 reste ouverte pour le corpus canonique. Pour VEILBREAK, le critère est la cohérence de la création originale avec l’univers et avec son propre modèle de référence; elle ne possède pas d’équivalent officiel à certifier.

## 4. Preuves de fonctionnement

### Moteur et données

Le [rapport du moteur](veilbreak-engine-validation.json) atteste **500/500 commandes** produisant leur effet dans un contexte adapté, **50/50 paires de simulations CPU déterministes** et **104 516 états numériques contrôlés**. Le [script correspondant](../../scripts/test-cqc-veilbreak-content.mjs) utilise le moteur CQC réel. Le [rapport structurel](veilbreak-data-validation.json) contrôle les profils, ressources, identifiants, références, scènes et rencontres.

Ce travail a notamment corrigé la trajectoire du ballast d’Oren et son super : une seule tête de ballast effectue son aller-retour. Les modifications éditoriales de noms et d’âges ne changent pas les données mécaniques vérifiées. Les empreintes du rapport identifient le périmètre de la vérification.

### Équipe, contrôleurs et client

Les vérifications de gameplay rapportent :

- **16 tests Node** pour l’équipe, dont des replays de duel et d’équipe : [tests d’équipe](../../scripts/test-cqc-p74-tag-team.mjs).
- **5 tests Node** pour le contrôleur VEILBREAK, couvrant notamment les phases des vingt boss : [tests du contrôleur](../../scripts/test-cqc-p74-veilbreak-controller.mjs).
- **7 tests Node** de progression de campagne : [tests de campagne](../../scripts/test-cqc-veilbreak-campaign.mjs).
- **12 tests Node** des états de résultat du portail : [tests des résultats](../../scripts/test-cqc-veilbreak-result-state.mjs). Ces cas avaient également été exercés en V8 pendant l’indisponibilité de l’exécuteur; cette première preuve demeure [identifiée séparément](../cqc-reprise/pass74/veilbreak/evidence/portal-result-v8-report.json).
- **5 contrôles navigateur** de l’interface d’équipe : [rapport](../cqc-reprise/pass74/gameplay/evidence/team-ui-report.json).
- **7 contrôles navigateur** du client léger : [rapport](../cqc-reprise/pass74/gameplay/evidence/veilbreak-client/report.json), dont une image volontairement introuvable pour vérifier la sortie et le bon jeton de session.

Les suites totalisent **40 tests Node uniques : 16 + 5 + 7 + 12**. Les regroupements « 33 gameplay » et « 19 campagne/résultats » partagent les douze cas de résultat et ne doivent pas être additionnés. Les 500 commandes exercées dans le moteur constituent une preuve distincte.

Les contrôles navigateur d’équipe et du client ont été réalisés sous Chromium 158, sans erreur JavaScript ni échec réseau inattendu; le 404 d’image du client était un cas de test volontaire. Après la restauration, le [rapport final du portail](../cqc-reprise/pass74/veilbreak/evidence/portal-report.json) ajoute **11 contrôles réussis**, avec zéro erreur JavaScript et zéro ressource manquante. Ils couvrent notamment la persistance de la sélection, les scènes, les dossiers, le lancement réel des premières rencontres de campagne et de Boss Rush, les transitions de progression par fixtures de protocole, le retour intégré et la mise en page mobile à 390 px. Les six galeries y rendent 99 images.

Cette régression porte sur le portail VEILBREAK et son client léger. **Le parcours historique v055 n’a pas reçu de contrôle navigateur exhaustif.** Les tests ne constituent pas une partie intégrale des quarante combats ni une certification d’équilibrage ou de déploiement.

Le [dossier gameplay](../cqc-reprise/pass74/gameplay/README.md), le [contrat du client](../cqc-reprise/pass74/gameplay/CLIENT_VEILBREAK.md) et les [tests du portail](../../scripts/test-cqc-veilbreak-portal.mjs) complètent ces preuves.

## 5. Continuation par rapport à la bible de combat

Le guide général et ses deux extensions conservent leurs exigences propres. La bible VEILBREAK apporte un lot de contenu et des contrats de jeu; la continuation P74 décrit leur mise en œuvre et les preuves disponibles.

| Exigence de la bible | Avancée de P74 | Travail encore ouvert |
| --- | --- | --- |
| Personnages, rôles et movesets | Dix combattants, vingt ennemis, vingt boss; 500 commandes exercées. | Animation des états, transitions, impacts, garde et attaques; réglage des adversaires. |
| Versus, entraînement et parcours | Client léger, campagne de quarante combats et Boss Rush de vingt boss. | Recettes prolongées, transitions et conditions de fin à maintenir avec les prochaines modifications. |
| Équipes, tag et assistances | Moteur local 2v2 et contrôles dédiés. | Déclinaisons du reste de la bible et validation des combinaisons supplémentaires. |
| Histoire par personnage | Soixante scènes écrites et dix rivalités. | Soixante illustrations propres, mise en scène et raccords avec la progression. |
| Stages | Vingt fonds composites et géométrie de duel définie. | Cent plans séparés de parallaxe, animations du décor et assemblage final. |
| Neutralisations | Trente concepts originaux. | Cinématiques, animations, sons, caméras et contrôleurs dédiés. |
| Costumes | Dix tenues de service et vingt variantes conçues. | Vingt costumes alternatifs illustrés et leurs animations compatibles. |
| Props et projectiles | Quarante fiches, vingt-neuf images conservées. | Traiter les onze absences et terminer les pièces mobiles et états séparés. |
| VFX, son et musique | Dix clips VFX prévus dans la bible. | Images des clips, sons, musique et validation de lisibilité. |
| Déblocages, bonus et extensions du guide | Progression de campagne décrite et reliée au portail. | Chaque règle restante doit disposer de sa propre implémentation et preuve; la campagne ne clôt pas les rubriques du guide. |
| Fidélité et finition | Traçabilité des candidats et des tests. | Comparaison 1:1 canonique, contrôle des futures animations, échelle des machines et équilibrage. |

Les grandes machines disposent d’un gabarit de duel adapté. Leurs dimensions fictionnelles, leurs points faibles articulés et leurs origines de projectiles demandent une validation spécifique; leur simple affichage ne certifie pas une échelle 1:1.

## 6. Ordre de reprise

1. Repartir du catalogue, des manifestes et des preuves publiés sur la branche de travail; préserver les identifiants et les qualifications d’absence.
2. Résoudre les dix résultats d’images indisponibles sans les confondre avec le refus connu de la pince, puis étendre la revue des galeries aux nouveaux fichiers.
3. Avancer sur les soixante-douze dossiers canoniques sans candidat et sur l’examen des candidats déjà disponibles.
4. Transformer les poses de base en animations propres aux profils, avec les projectiles et pièces mobiles séparés.
5. Produire les cent plans de parallaxe, les illustrations narratives, les vingt costumes alternatifs, les trente neutralisations et les clips VFX.
6. Vérifier les fonctions supplémentaires de la bible à partir de critères jouables, puis poursuivre l’équilibrage.

**P74 ne clôt ni la fidélité 1:1, ni l’ensemble de la bible, ni l’équilibrage du jeu.** Ses avancées sont les contenus, les fichiers conservés et les comportements effectivement étayés par les preuves ci-dessus.
